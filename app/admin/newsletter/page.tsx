"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { BACKEND_URL } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Send, Users } from "lucide-react";

export default function NewsletterAdminPage() {
  const { token } = useAuth();
  const { toast } = useToast();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [isLoadingSubscribers, setIsLoadingSubscribers] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const canSend = useMemo(() => {
    return subject.trim().length > 0 && message.trim().length > 0 && !isSending;
  }, [subject, message, isSending]);

  useEffect(() => {
    if (!token) {
      setIsLoadingSubscribers(false);
      return;
    }

    const loadSubscribers = async () => {
      setIsLoadingSubscribers(true);
      try {
        const res = await fetch(`${BACKEND_URL}/newsletter/subscribers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to load subscribers");
        }

        setSubscribers(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        const description =
          error instanceof Error ? error.message : "Could not load subscribers";
        toast({
          title: "Error",
          description,
          variant: "destructive",
        });
      } finally {
        setIsLoadingSubscribers(false);
      }
    };

    void loadSubscribers();
  }, [token, toast]);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    if (!cleanSubject || !cleanMessage) {
      toast({
        title: "Missing fields",
        description: "Subject and message are required",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch(`${BACKEND_URL}/newsletter/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: cleanSubject,
          message: cleanMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send newsletter");
      }

      toast({
        title: "Newsletter sent",
        description: `Sent: ${data.sent ?? 0}, Failed: ${data.failed ?? 0}`,
      });

      setSubject("");
      setMessage("");
    } catch (error) {
      const description =
        error instanceof Error ? error.message : "Failed to send newsletter";
      toast({
        title: "Error",
        description,
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-2 sm:p-6">
      <div className="rounded-3xl ring-1 ring-black/5  p-6 sm:p-8">
        <h1 className="text-3xl font-black tracking-[-0.04em] text-jcl-primary">
          Newsletter
        </h1>
        <p className="mt-2 text-sm text-black/60">
          Send updates to users who subscribed through the footer.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-transparent bg-black/[0.04] p-4">
            <div className="flex items-center gap-2 text-black/75">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Subscribers</span>
            </div>
            <p className="mt-2 text-3xl font-black text-jcl-primary">
              {isLoadingSubscribers ? "..." : subscribers.length}
            </p>
          </div>
          <div className="rounded-2xl border border-transparent bg-black/[0.04] p-4">
            <div className="flex items-center gap-2 text-black/75">
              <Mail className="h-4 w-4" />
              <span className="text-sm font-medium">Delivery</span>
            </div>
            <p className="mt-2 text-sm text-black/70">
              Uses current email provider from backend environment.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSend}
        className="rounded-3xl border border-transparent bg-black/[0.03] p-6 sm:p-8"
      >
        <h2 className="text-xl font-black tracking-[-0.03em] text-jcl-primary">
          Compose Update
        </h2>

        <div className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="newsletter-subject"
              className="mb-2 block text-sm font-semibold text-black/80"
            >
              Subject
            </label>
            <Input
              id="newsletter-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Monthly updates from JCL Group"
              className="border border-transparent bg-black/[0.04] text-black placeholder:text-black/35 hover:bg-black/[0.06] focus-visible:ring-2 focus-visible:ring-jcl-black"
              disabled={isSending}
            />
          </div>

          <div>
            <label
              htmlFor="newsletter-message"
              className="mb-2 block text-sm font-semibold text-black/80"
            >
              Message
            </label>
            <textarea
              id="newsletter-message"
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your update to subscribers..."
              className="w-full rounded-2xl border border-transparent bg-black/[0.04] px-4 py-3 text-sm text-black placeholder:text-black/35 outline-none ring-0 transition hover:bg-black/[0.06] focus:ring-2 focus:ring-jcl-black disabled:opacity-60"
              disabled={isSending}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Button
            type="submit"
            disabled={!canSend}
            className="rounded-full bg-jcl-black text-white hover:bg-jcl-primary/90"
          >
            {isSending ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Update
              </span>
            )}
          </Button>
          <p className="text-xs text-black/55">
            This sends to all current subscribers.
          </p>
        </div>
      </form>

      <div className="rounded-3xl border border-transparent bg-black/[0.03] p-6 sm:p-8">
        <h2 className="text-xl font-black tracking-[-0.03em] text-jcl-primary">
          Subscribers List
        </h2>

        {isLoadingSubscribers ? (
          <div className="mt-4 flex items-center gap-2 text-sm text-black/70">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading subscribers...
          </div>
        ) : subscribers.length === 0 ? (
          <p className="mt-4 text-sm text-black/65">No subscribers yet.</p>
        ) : (
          <ul className="mt-4 max-h-72 space-y-2 overflow-y-auto pr-2">
            {subscribers.map((email) => (
              <li
                key={email}
                className="rounded-xl border border-transparent bg-black/[0.04] px-3 py-2 text-sm text-black/80"
              >
                {email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
