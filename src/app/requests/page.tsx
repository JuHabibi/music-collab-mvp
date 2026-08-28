import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Footer } from "@/components/Footer";
import { ServerHeader } from "@/components/ServerHeader";
import { Badge, Card, Container } from "@/components/ui";
import {
  getReceivedCollaborationRequests,
  getSentCollaborationRequests,
} from "@/features/collaboration-requests/collaborationRequestRepository";
import { CollaborationRequestActions } from "@/features/collaboration-requests/components/CollaborationRequestActions";
import type {
  CollaborationRequestProfileSummary,
  CollaborationRequestStatus,
  ReceivedCollaborationRequest,
  SentCollaborationRequest,
} from "@/features/collaboration-requests/types";
import { AmbientBackground } from "@/features/home/components/Background";
import { supabaseServer } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Collaboration requests — Vaultune",
  description:
    "View collaboration requests you have received and sent on Vaultune.",
};

function formatCreatedAt(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusBadgeClassName(status: CollaborationRequestStatus) {
  if (status === "accepted") {
    return "border border-emerald-200/15 bg-emerald-200/[0.06] text-emerald-200/90";
  }
  if (status === "declined") {
    return "border border-red-200/15 bg-red-200/[0.06] text-red-200/90";
  }
  if (status === "cancelled") {
    return "bg-white/[0.02] text-white/55";
  }
  return "border border-amber-200/15 bg-amber-200/[0.06] text-amber-200/90";
}

function ProfileSummary({
  profile,
}: {
  profile: CollaborationRequestProfileSummary | null;
}) {
  if (!profile) {
    return (
      <div className="font-[var(--font-display)] text-lg tracking-tight text-white/55">
        Profile unavailable
      </div>
    );
  }

  return (
    <>
      <div className="font-[var(--font-display)] text-lg tracking-tight text-white">
        {profile.display_name}
      </div>
      <p className="mt-1 text-sm text-white/70">{profile.primary_role}</p>
      {profile.city ? (
        <p className="mt-1 text-sm text-white/55">{profile.city}</p>
      ) : null}
    </>
  );
}

function RequestCard({
  profile,
  message,
  status,
  createdAt,
  actions,
}: {
  profile: CollaborationRequestProfileSummary | null;
  message: string;
  status: CollaborationRequestStatus;
  createdAt: string;
  actions?: React.ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <ProfileSummary profile={profile} />
        <Badge className={statusBadgeClassName(status)}>
          {formatStatus(status)}
        </Badge>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-white/78">{message}</p>

      <p className="mt-4 text-xs text-white/45">
        {formatCreatedAt(createdAt)}
      </p>

      {actions}
    </Card>
  );
}

export default async function RequestsPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [receivedRequests, sentRequests] = await Promise.all([
    getReceivedCollaborationRequests(supabase, user.id),
    getSentCollaborationRequests(supabase, user.id),
  ]);

  return (
    <main className="relative">
      <AmbientBackground />
      <ServerHeader />

      <section className="relative py-12 md:py-16">
        <Container>
          <div className="max-w-3xl">
            <div className="text-xs font-medium tracking-wide text-white/55">
              Inbox
            </div>
            <h1 className="mt-3 font-[var(--font-display)] text-4xl tracking-tight text-white sm:text-5xl">
              Collaboration requests
            </h1>
            <p className="mt-3 text-sm text-white/65 sm:text-[15px]">
              Requests you have received and sent.
            </p>
          </div>

          <div className="mt-12 max-w-3xl">
            <section>
              <h2 className="font-[var(--font-display)] text-2xl tracking-tight text-white">
                Received requests
              </h2>
              {receivedRequests.length === 0 ? (
                <p className="mt-4 text-sm text-white/55">
                  No collaboration requests received yet.
                </p>
              ) : (
                <div className="mt-4 grid gap-4">
                  {receivedRequests.map((request: ReceivedCollaborationRequest) => (
                    <RequestCard
                      key={request.id}
                      profile={request.sender}
                      message={request.message}
                      status={request.status as CollaborationRequestStatus}
                      createdAt={request.created_at}
                      actions={
                        request.status === "pending" ? (
                          <CollaborationRequestActions
                            requestId={request.id}
                            variant="received"
                          />
                        ) : null
                      }
                    />
                  ))}
                </div>
              )}
            </section>

            <section className="mt-10">
              <h2 className="font-[var(--font-display)] text-2xl tracking-tight text-white">
                Sent requests
              </h2>
              {sentRequests.length === 0 ? (
                <p className="mt-4 text-sm text-white/55">
                  No collaboration requests sent yet.
                </p>
              ) : (
                <div className="mt-4 grid gap-4">
                  {sentRequests.map((request: SentCollaborationRequest) => (
                    <RequestCard
                      key={request.id}
                      profile={request.receiver}
                      message={request.message}
                      status={request.status as CollaborationRequestStatus}
                      createdAt={request.created_at}
                      actions={
                        request.status === "pending" ? (
                          <CollaborationRequestActions
                            requestId={request.id}
                            variant="sent"
                          />
                        ) : null
                      }
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
