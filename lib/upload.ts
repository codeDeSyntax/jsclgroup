import { BACKEND_URL } from "@/lib/auth";

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
export const MAX_UPLOAD_MB = 8;
export const MAX_GALLERY_FILES = 10;

export type UploadFolder = string;

function assertToken(
  token: string | null | undefined,
): asserts token is string {
  if (!token) {
    throw new Error("You must be logged in to upload images.");
  }
}

export function validateImageFile(file: File): void {
  if (!file.type.startsWith("image/")) {
    throw new Error(`"${file.name}" is not an image file.`);
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(
      `"${file.name}" is too large. Maximum size is ${MAX_UPLOAD_MB}MB.`,
    );
  }
}

export function validateImageFiles(files: File[]): void {
  if (files.length === 0) {
    throw new Error("Select at least one image.");
  }
  if (files.length > MAX_GALLERY_FILES) {
    throw new Error(
      `You can upload up to ${MAX_GALLERY_FILES} images at once.`,
    );
  }
  files.forEach(validateImageFile);
}

async function parseUploadError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    return data.error || "Upload failed";
  } catch {
    return "Upload failed";
  }
}

export async function uploadImage(
  file: File,
  token: string | null | undefined,
  folder: UploadFolder,
): Promise<string> {
  assertToken(token);
  validateImageFile(file);

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `${BACKEND_URL}/dashboard/uploads/image?folder=${folder}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error(await parseUploadError(response));
  }

  const data = await response.json();
  const url = data.data?.url as string | undefined;
  if (!url) throw new Error("Upload response did not include an image URL.");
  return url;
}

export async function uploadImages(
  files: File[],
  token: string | null | undefined,
  folder: UploadFolder,
): Promise<string[]> {
  assertToken(token);
  validateImageFiles(files);

  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const response = await fetch(
    `${BACKEND_URL}/dashboard/uploads/images?folder=${folder}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error(await parseUploadError(response));
  }

  const data = await response.json();
  const urls = data.data?.urls as string[] | undefined;
  if (!urls?.length) {
    throw new Error("Upload response did not include image URLs.");
  }
  return urls;
}

export function readFilePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read image preview."));
    reader.readAsDataURL(file);
  });
}
