"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { BACKEND_URL } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const { token } = useAuth();
  const { toast } = useToast();
  const [contactPhone, setContactPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [savedPhone, setSavedPhone] = useState("");

  // Fetch current phone setting
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/settings/contact_phone`);
        if (res.ok) {
          const data = await res.json();
          setContactPhone(data.data.value);
          setSavedPhone(data.data.value);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!contactPhone.trim()) {
      toast({
        title: "Error",
        description: "Phone number cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`${BACKEND_URL}/settings/contact_phone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value: contactPhone.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        setSavedPhone(data.data.value);
        toast({
          title: "Success",
          description: "Phone number updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save phone number",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast({
        title: "Error",
        description: "An error occurred while saving",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setContactPhone(savedPhone);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-jcl-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="mx-auto max-w-4xl p-2 sm:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-[-0.04em] text-jcl-primary">
            Settings
          </h1>
          <p className="mt-2 text-sm text-black/60">
            Manage your application settings
          </p>
        </div>

        {/* Contact Phone Section */}
        <div className="rounded-3xl border border-transparent bg-black/[0.03] p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-black tracking-[-0.03em] text-jcl-primary">
              Contact Phone Number
            </h2>
            <p className="mt-1 text-sm text-black/60">
              This phone number is used for cart checkout and contact form
              requests (WhatsApp)
            </p>
          </div>

          <div className="space-y-4">
            {/* Phone Input */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-black/80"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="e.g., 0557860299"
                className="w-full max-w-md border border-transparent bg-black/[0.04] text-black placeholder:text-black/35 hover:bg-black/[0.06] focus-visible:ring-2 focus-visible:ring-jcl-black"
              />
              <p className="mt-1 text-xs text-black/50">
                Include country code (e.g., +233 or 233)
              </p>
            </div>

            {/* Info Box */}
            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-jcl-accent/10 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-jcl-primary" />
              <div className="text-sm text-jcl-primary">
                <p className="font-medium">Where this is used:</p>
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>Cart checkout WhatsApp messages</li>
                  <li>Contact form submissions</li>
                  <li>Customer Reach out</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                disabled={isSaving || contactPhone === savedPhone}
                className="flex items-center gap-2 rounded-full bg-jcl-black text-white hover:bg-jcl-primary/90"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : contactPhone === savedPhone ? (
                  <>
                    <Check className="h-4 w-4" />
                    Saved
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              {contactPhone !== savedPhone && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="rounded-full border-transparent bg-black/[0.06] hover:bg-black/[0.1]"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
