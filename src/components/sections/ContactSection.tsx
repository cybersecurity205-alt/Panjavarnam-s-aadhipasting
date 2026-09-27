"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FloralDecor } from "@/components/ui/FloralDecor";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { siteContent } from "@/data/siteContent";

export const ContactSection: React.FC = () => {
  const { contact } = siteContent;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Calendar Pasting & Tinning",
    quantity: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [enquiryNumber, setEnquiryNumber] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiryNumber(data.enquiryNumber);
        setSubmitted(true);
      } else {
        setSubmitError(data.error || "Failed to submit quote inquiry. Please try again.");
      }
    } catch (err) {
      setSubmitError("Network error. Please call or WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const generateWhatsAppMessage = () => {
    const text = `Hello Aadhi Pasting, my name is ${formData.name || "Client"}. 
Phone: ${formData.phone || "N/A"}
Service: ${formData.service}
Quantity: ${formData.quantity || "Not specified"}
Message: ${formData.message || "Please share quotation."}`;
    return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-[#FAF7F2] border-t border-[#C5A059]/20 scroll-mt-20 relative">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            badge="Direct Commercial Inquiries"
            title="Connect with Aadhi Pasting"
            highlight="— Request a Quotation"
            subtitle="Whether you need seasonal Tamil daily calendar mounting with tinning, durable chit fund passbook binding, or bulk publishing dispatch, our estimators are ready."
          />
        </motion.div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Business & Facility Info */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="liquid-glass-card p-7 sm:p-8 rounded-3xl border border-[#C5A059]/25 space-y-5 shadow-card">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#55122C] block mb-1">
                    Central Facility & Plant
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#232126]">
                    {contact.brandName}
                  </h3>
                  <p className="text-xs text-[#595561] mt-0.5">
                    {contact.tagline}
                  </p>
                </div>
                <div className="h-11 w-11 rounded-full bg-[#FAF7F2] border border-[#C5A059]/35 flex items-center justify-center text-[#55122C] shrink-0 shadow-xs">
                  <FloralDecor variant="crest" className="w-6 h-6 text-[#C5A059]" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#C5A059]/15 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div className="text-[#595561] leading-relaxed text-xs sm:text-sm">
                    <p className="font-bold text-[#232126]">Production Facility Address</p>
                    <p>{contact.address.street}</p>
                    <p>{contact.address.area}</p>
                    <p>
                      {contact.address.city}, {contact.address.state} - {contact.address.pincode}
                    </p>
                    <p>{contact.address.country}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <Phone className="h-5 w-5 text-[#C5A059] shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#7D7886]">
                      Direct Inquiries Line
                    </p>
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                      className="font-mono text-sm sm:text-base font-bold text-[#232126] hover:text-[#55122C] transition-colors"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <Mail className="h-5 w-5 text-[#C5A059] shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#7D7886]">
                      Official Quotes Email
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-mono text-sm sm:text-base font-bold text-[#232126] hover:text-[#55122C] transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <Clock className="h-5 w-5 text-[#C5A059] shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#7D7886]">
                      Operating Hours
                    </p>
                    <p className="text-xs font-semibold text-[#232126]">
                      {contact.workingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
                    contact.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-xs sm:text-sm shadow-xs hover:bg-[#20BA5A] hover:shadow-[0_8px_20px_rgba(37,211,102,0.3)] transition-all"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-current" />
                  <span>Instant Inquiry on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Regional Dispatch Note */}
            <div className="liquid-glass-card p-4 rounded-2xl border border-[#C5A059]/25 text-xs text-[#595561] shadow-xs">
              <span className="font-bold text-[#232126]">Regional Dispatch Coverage:</span> Regular daily scheduled transit routes connecting Sivakasi, Madurai, Tiruchirappalli, Coimbatore, Salem, and Chennai printing corridors.
            </div>
          </motion.div>

          {/* Right Column: Complete Quote Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="liquid-glass-card p-7 sm:p-9 rounded-3xl border border-[#C5A059]/25 shadow-card">
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold text-[#232126]">
                  Send a Quotation Specification
                </h3>
                <p className="text-xs sm:text-sm text-[#595561] mt-1 font-light">
                  Fill in your project requirements below. Our commercial team will evaluate substrate specs and respond promptly.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-3xl bg-[#F4EFE6]/70 backdrop-blur-md border border-[#C5A059]/35 text-center space-y-4 animate-in fade-in">
                  <div className="h-12 w-12 mx-auto rounded-full bg-[#55122C] text-[#FAF7F2] flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#232126]">
                    Quote Request Received!
                  </h4>
                  {enquiryNumber && (
                    <div className="inline-block px-3.5 py-1 rounded-full bg-white border border-[#C5A059]/35 font-mono text-xs font-bold text-[#55122C] shadow-xs">
                      Reference: {enquiryNumber}
                    </div>
                  )}
                  <p className="text-sm text-[#595561] max-w-md mx-auto">
                    Thank you, {formData.name}. Our production estimator has received your specification for {formData.service} and will contact you shortly.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setEnquiryNumber(null);
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                      {submitError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#232126] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Ramesh Kumar"
                        className="input-liquid-glass w-full px-4 py-3 rounded-2xl text-[#232126] text-base sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#232126] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 90808 67822"
                        className="input-liquid-glass w-full px-4 py-3 rounded-2xl text-[#232126] text-base sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#232126] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="procurement@company.com"
                        className="input-liquid-glass w-full px-4 py-3 rounded-2xl text-[#232126] text-base sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#232126] mb-1.5">
                        Approximate Quantity
                      </label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({ ...formData, quantity: e.target.value })
                        }
                        placeholder="e.g. 5,000 calendars / 1,000 chit books"
                        className="input-liquid-glass w-full px-4 py-3 rounded-2xl text-[#232126] text-base sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#232126] mb-1.5">
                      Pasting Service Required *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="input-liquid-glass w-full px-4 py-3 rounded-2xl text-[#232126] text-base sm:text-sm"
                    >
                      <option>Calendar Pasting & Tinning (Daily Tamil / Monthly Wall)</option>
                      <option>Chits Business Pasting & Binding (Passbooks / Ledger Cards)</option>
                      <option>Rigid Chipboard & Greyboard Mounting (1.5mm - 4.0mm)</option>
                      <option>Commercial Sticker & Vinyl Pasting</option>
                      <option>FMCG Packaging & Box Label Pasting</option>
                      <option>High-Volume Bulk Production (100K+ Sheets)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#232126] mb-1.5">
                      Project Dimensions & Board Specifics
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Specify sheet size (e.g. 15x20 in), board caliper (1.5mm, 2.0mm, 3.0mm), tinning rim requirements, or chit passbook quantities..."
                      className="input-liquid-glass w-full px-4 py-3 rounded-2xl text-[#232126] text-base sm:text-sm"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      isLoading={submitting}
                      icon={<Send className="h-4 w-4" />}
                    >
                      Send Quotation Inquiry
                    </Button>

                    <a
                      href={generateWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:underline"
                    >
                      <WhatsAppIcon className="h-4 w-4 fill-current" />
                      Forward specification via WhatsApp →
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
