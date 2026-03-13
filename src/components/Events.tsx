"use client";

import Image from "next/image";
import { MapPin, CalendarDays, ExternalLink, ArrowUpRight } from "lucide-react";
import { useEvents } from "@/hooks/useSupabaseData";
import AnimatedSection from "./AnimatedSection";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-MY", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Events() {
  const { data: events } = useEvents();
  const upcoming = events.filter((e) => e.status === "upcoming").slice(0, 2);
  const past = events.filter((e) => e.status === "past").slice(0, 4);

  return (
    <section id="events" className="relative py-28 sm:py-36">
      <div className="section-divider mb-28 sm:mb-36" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedSection className="mb-16" zoom>
          <div className="gold-line mb-5" />
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-light mb-5">
            Events
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.05]">
            Join Us at Our Events
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-xl leading-relaxed">
            From builder nights to hackathons — connect with the Solana
            community across Malaysia.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Event cards */}
          <div className="lg:col-span-3 space-y-4">
            {upcoming.length > 0 && (
              <>
                <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-light mb-3">
                  Upcoming
                </h3>
                {upcoming.map((event, i) => (
                  <AnimatedSection key={event.id} delay={i * 0.1} zoom>
                    <a
                      href={event.lumaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group card-glow glass glass-hover rounded-2xl block transition-all duration-400 hover:-translate-y-0.5 overflow-hidden"
                    >
                      {/* Event image banner */}
                      <div className="relative h-32 sm:h-40 overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 60vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-3 right-3 z-10">
                          <ArrowUpRight size={16} className="text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <div className="flex items-start gap-3 sm:gap-5">
                          <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gold/[0.08] border border-gold/10 flex flex-col items-center justify-center">
                            <span className="text-[11px] font-mono uppercase text-gold-light leading-none">
                              {new Date(event.date).toLocaleDateString("en", {
                                month: "short",
                              })}
                            </span>
                            <span className="text-xl font-bold text-text-primary leading-none mt-0.5">
                              {new Date(event.date).getDate()}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-light">
                                Upcoming
                              </span>
                            </div>
                            <h4 className="text-[17px] font-semibold group-hover:text-gold-light transition-colors duration-300 truncate">
                              {event.title}
                            </h4>
                            <p className="text-[13px] text-text-secondary mt-1 line-clamp-2 leading-relaxed">
                              {event.description}
                            </p>
                            <div className="flex items-center gap-4 text-[11px] text-text-muted mt-3 font-mono">
                              <span className="flex items-center gap-1.5">
                                <CalendarDays size={11} />
                                {formatDate(event.date)}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MapPin size={11} />
                                {event.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </AnimatedSection>
                ))}
              </>
            )}

            {past.length > 0 && (
              <div className="mt-8">
                <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-text-muted mb-3">
                  Past Events
                </h3>
                {past.map((event, i) => (
                  <AnimatedSection key={event.id} delay={i * 0.1}>
                    <a
                      href={event.lumaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass rounded-2xl overflow-hidden opacity-60 mb-3 hover:opacity-80 transition-opacity duration-300 flex items-center gap-4 p-3 group block"
                    >
                      <div className="shrink-0 w-14 h-14 rounded-lg overflow-hidden relative">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[15px] font-medium text-text-secondary truncate group-hover:text-text-primary transition-colors">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-3 text-[11px] text-text-muted font-mono mt-0.5">
                          <span>{formatDate(event.date)}</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </a>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>

          {/* Luma calendar sidebar */}
          <AnimatedSection className="lg:col-span-2" delay={0.2} zoom>
            <div className="glass rounded-2xl p-5 h-full">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-light mb-4">
                Calendar
              </h3>
              <div className="space-y-2 mb-4">
                {events.map((event) => (
                  <a
                    key={event.id}
                    href={event.lumaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden relative">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium truncate group-hover:text-gold-light transition-colors">{event.title}</p>
                      <p className="text-[11px] text-text-muted font-mono">{formatDate(event.date)}</p>
                    </div>
                    <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full shrink-0 ${event.status === "upcoming" ? "bg-gold/10 text-gold-light" : "bg-white/[0.04] text-text-muted"}`}>
                      {event.status}
                    </span>
                  </a>
                ))}
              </div>
              <a
                href="https://lu.ma/mysuperteam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border hover:border-gold/30 text-[13px] text-text-secondary hover:text-gold-light transition-all duration-300 font-medium"
              >
                <ExternalLink size={13} />
                View All Events on Luma
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
