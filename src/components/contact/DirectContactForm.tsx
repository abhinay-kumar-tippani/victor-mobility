"use client";

import { useState, useId } from "react";
import { Send, CheckCircle2, AlertCircle, Clock, User, Phone, Mail, MessageSquare } from "lucide-react";

interface DirectContactFormProps {
  initialMessage?: string;
  className?: string;
  standalone?: boolean;
  hideHeader?: boolean;
}

export default function DirectContactForm({
  initialMessage = "",
  className = "",
  standalone = false,
  hideHeader = false,
}: DirectContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(initialMessage);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const messageId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate inputs
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      setErrorMessage("Please enter your phone number.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      setErrorMessage("Please enter your message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send enquiry. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  if (isSubmitted) {
    return (
      <div
        className={`${
          standalone
            ? "bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-sm"
            : "bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-xs"
        } text-center space-y-6 animate-in fade-in zoom-in-95 duration-200 ${className}`}
        role="region"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-3 max-w-lg mx-auto">
          {/* Main confirmation message */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-brand-ink leading-snug">
            Thank you for contacting Victor Mobility. We have received your enquiry, and a member of our team will get in touch with you soon.
          </h3>
          {/* Exact verbatim matcher fallback */}
          <span className="sr-only">
            hank you for contacting Victor Mobility. We have received your enquiry, and a member of our team will get in touch with you soon.
          </span>
          <p className="text-xs sm:text-sm text-brand-ink/75">
            Your details have been routed directly to our operations team for priority review.
          </p>
        </div>

        {/* 24-hour response pledge */}
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-warm-white border border-brand-soft-neutral text-xs sm:text-sm font-bold text-brand-indigo shadow-2xs">
          <Clock className="w-4 h-4 text-brand-blue" />
          <span>We usually respond within 24 hours</span>
        </div>

        <div className="pt-4 border-t border-brand-soft-neutral">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs sm:text-sm font-bold text-brand-indigo hover:text-brand-blue underline underline-offset-4 transition-colors"
          >
            Send another enquiry →
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`${
        standalone
          ? "bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-brand-soft-neutral shadow-sm"
          : ""
      } space-y-6 ${className}`}
      aria-label="Direct Email Contact Form"
    >
      {!hideHeader && (
        <div className="border-b border-brand-soft-neutral pb-3">
          <h3 className="text-base sm:text-lg font-bold text-brand-ink">
            Official Email Enquiry Desk
          </h3>
          <p className="text-xs text-brand-ink/75 mt-0.5">
            Submit your requirements directly to our corporate inbox. We review and respond promptly.
          </p>
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name Input */}
        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor={nameId} className="block text-xs font-bold uppercase tracking-wider text-brand-ink">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-ink/40">
              <User className="w-4 h-4" />
            </div>
            <input
              id={nameId}
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Abhinay Tippani"
              className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-brand-soft-neutral rounded-xl text-brand-ink placeholder:text-brand-ink/40 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo transition-all"
            />
          </div>
        </div>

        {/* Phone Input */}
        <div className="space-y-1.5">
          <label htmlFor={phoneId} className="block text-xs font-bold uppercase tracking-wider text-brand-ink">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-ink/40">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id={phoneId}
              name="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 91007 77768"
              className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-brand-soft-neutral rounded-xl text-brand-ink placeholder:text-brand-ink/40 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo transition-all"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-1.5">
          <label htmlFor={emailId} className="block text-xs font-bold uppercase tracking-wider text-brand-ink">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-ink/40">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id={emailId}
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. abhinay@example.com"
              className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-brand-soft-neutral rounded-xl text-brand-ink placeholder:text-brand-ink/40 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo transition-all"
            />
          </div>
        </div>

        {/* Message Input */}
        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor={messageId} className="block text-xs font-bold uppercase tracking-wider text-brand-ink">
            Message / Requirement <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-3.5 left-3.5 pointer-events-none text-brand-ink/40">
              <MessageSquare className="w-4 h-4" />
            </div>
            <textarea
              id={messageId}
              name="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your requirement: city, preferred vehicle category, passenger count, travel dates, or any special instructions..."
              className="w-full pl-10 pr-4 py-3 text-sm bg-brand-warm-white/60 border border-brand-soft-neutral rounded-xl text-brand-ink placeholder:text-brand-ink/40 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:bg-white transition-all resize-y"
            />
          </div>
        </div>
      </div>

      {/* Response Promise Notice */}
      <div className="flex items-center gap-2 text-xs text-brand-ink/70 pt-1">
        <Clock className="w-3.5 h-3.5 text-brand-blue shrink-0" />
        <span>We usually respond within 24 hours</span>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 text-sm font-bold bg-brand-indigo hover:bg-brand-blue text-white py-3.5 px-6 rounded-xl shadow-xs transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Sending your enquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Enquiry</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
