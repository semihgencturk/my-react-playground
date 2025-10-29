import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodNumber } from "zod";
import styles from "./WorkingWithFormsPage.module.css";

const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: "Enter your full name." })
    .min(2, { message: "Full name must be at least 2 characters long." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Enter your email address." })
    .email("Provide a valid email address."),
  team: z.enum(["design", "engineering", "product"], {
    message: "Select the team you collaborate with most.",
  }),
  experience: z.coerce
    .number()
    .refine((value) => !Number.isNaN(value), {
      message: "Enter your years of experience.",
    })
    .min(0, { message: "Experience cannot be negative." })
    .max(50, { message: "Experience must be 50 years or fewer." }),
  startDate: z
    .string()
    .min(1, { message: "Select an onboarding date." })
    .refine(
      (value) => {
        if (!value) {
          return false;
        }

        const date = new Date(value);
        return !Number.isNaN(date.getTime());
      },
      { message: "Provide a valid date." }
    ),
  bio: z
    .string()
    .max(200, "Bio must be 200 characters or fewer.")
    .optional()
    .transform((value) => value?.trim() || undefined),
  terms: z.boolean().refine((value) => value, {
    message: "You need to agree to the onboarding guidelines.",
  }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const defaultValues: ProfileFormData = {
  fullName: "",
  email: "",
  team: "engineering",
  experience: 2,
  startDate: "",
  bio: "",
  terms: false,
};

type SubmissionHistoryEntry = ProfileFormData & {
  submittedAt: string;
};

const STORAGE_KEY = "working-with-forms:recent-submissions";

export default function WorkingWithFormsPage() {
  const [submittedData, setSubmittedData] = useState<ProfileFormData | null>(
    null
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submissionHistory, setSubmissionHistory] = useState<
    SubmissionHistoryEntry[]
  >([]);
  const hasHydratedHistoryRef = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting, submitCount },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SubmissionHistoryEntry[];
        setSubmissionHistory(parsed.slice(0, 3));
      }
    } catch (error) {
      console.warn("Failed to read saved submissions", error);
    } finally {
      hasHydratedHistoryRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hasHydratedHistoryRef.current || typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(submissionHistory)
      );
    } catch (error) {
      console.warn("Failed to persist submissions", error);
    }
  }, [submissionHistory]);

  const bioLength = watch("bio")?.length ?? 0;

  const submitProfile = async (values: ProfileFormData) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 600);
    });

    const shouldFail =
      values.fullName.toLowerCase().includes("error") ||
      values.email.toLowerCase().includes("fail");

    if (shouldFail) {
      throw new Error(
        "Our servers could not process this profile right now. Please try again."
      );
    }
  };

  const onSubmit = async (values: ProfileFormData) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      await submitProfile(values);

      setSubmittedData(values);
      setSuccessMessage("Profile submitted successfully!");
      setSubmissionHistory((previous) => {
        const next: SubmissionHistoryEntry[] = [
          {
            ...values,
            submittedAt: new Date().toISOString(),
          },
          ...previous,
        ];

        return next.slice(0, 3);
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please retry.";
      setServerError(message);

      throw error;
    }
  };

  const shouldShowValidationState = submitCount > 0;

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage(null);
    }, 3200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [successMessage]);

  const formatStartDate = (value: string) => {
    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(parsed);
  };

  const formatSubmissionTimestamp = (value: string) => {
    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(parsed);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Working With Forms</span>
        <h1 className={styles.title}>Type-Safe Profile Intake Form</h1>
        <p className={styles.lead}>
          This form demonstrates how to pair React Hook Form with a Zod schema
          for declarative validation, typed data, and graceful UX feedback.
          Every field is registered with the form state and errors surface only
          after interaction.
        </p>
      </header>

      <form
        className={styles.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        {serverError && (
          <div className={styles.serverError} role="alert">
            {serverError}
          </div>
        )}

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Basics</legend>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="fullName">
                Full name
              </label>
              <span className={styles.helper}>At least 2 characters</span>
            </div>
            <input
              id="fullName"
              className={styles.input}
              placeholder="Jordan Walsh"
              autoComplete="name"
              aria-invalid={errors.fullName ? "true" : "false"}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              {...register("fullName")}
            />
            {errors.fullName && (
              <span className={styles.error} id="fullName-error" role="alert">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="email">
                Work email
              </label>
            </div>
            <input
              id="email"
              className={styles.input}
              type="email"
              placeholder="jordan@example.com"
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.error} id="email-error" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="team">
                Primary team
              </label>
            </div>
            <select
              id="team"
              className={styles.select}
              aria-invalid={errors.team ? "true" : "false"}
              aria-describedby={errors.team ? "team-error" : undefined}
              {...register("team")}
            >
              <option value="design">Design</option>
              <option value="engineering">Engineering</option>
              <option value="product">Product</option>
            </select>
            {errors.team && (
              <span className={styles.error} id="team-error" role="alert">
                {errors.team.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="experience">
                Years of experience
              </label>
              <span className={styles.helper}>0 - 50 years</span>
            </div>
            <input
              id="experience"
              className={styles.input}
              type="number"
              inputMode="decimal"
              aria-invalid={errors.experience ? "true" : "false"}
              aria-describedby={
                errors.experience ? "experience-error" : undefined
              }
              {...register("experience")}
            />
            {errors.experience && (
              <span className={styles.error} id="experience-error" role="alert">
                {errors.experience.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="startDate">
                Target start date
              </label>
            </div>
            <input
              id="startDate"
              className={styles.input}
              type="date"
              aria-invalid={errors.startDate ? "true" : "false"}
              aria-describedby={
                errors.startDate ? "startDate-error" : undefined
              }
              {...register("startDate")}
            />
            {errors.startDate && (
              <span className={styles.error} id="startDate-error" role="alert">
                {errors.startDate.message}
              </span>
            )}
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Collaboration</legend>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="bio">
                Collaboration summary
              </label>
              <span className={styles.charCount}>{bioLength}/200</span>
            </div>
            <textarea
              id="bio"
              className={styles.textarea}
              placeholder="How do you prefer teammates to collaborate with you?"
              aria-invalid={errors.bio ? "true" : "false"}
              aria-describedby={errors.bio ? "bio-error" : undefined}
              {...register("bio")}
            />
            {errors.bio && (
              <span className={styles.error} id="bio-error" role="alert">
                {errors.bio.message}
              </span>
            )}
          </div>

          <div className={styles.checkboxRow}>
            <input
              id="terms"
              className={styles.checkbox}
              type="checkbox"
              aria-invalid={errors.terms ? "true" : "false"}
              aria-describedby={errors.terms ? "terms-error" : undefined}
              {...register("terms")}
            />
            <label className={styles.label} htmlFor="terms">
              I have read the onboarding guidelines and agree to share a project
              update during the first sprint.
            </label>
          </div>
          {errors.terms && (
            <span className={styles.error} id="terms-error" role="alert">
              {errors.terms.message}
            </span>
          )}
        </fieldset>

        <div className={styles.actions}>
          <button
            className={styles.resetButton}
            type="button"
            onClick={() => {
              reset(defaultValues);
              setSubmittedData(null);
              setServerError(null);
              setSuccessMessage(null);
            }}
          >
            Reset
          </button>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isSubmitting || (shouldShowValidationState && !isValid)}
          >
            {isSubmitting ? "Submitting..." : "Submit profile"}
          </button>
        </div>
      </form>

      {submittedData && (
        <section className={styles.summary} aria-live="polite">
          <h2 className={styles.summaryTitle}>Latest submission</h2>
          <ul className={styles.summaryList}>
            <li>
              <strong>Name:</strong> {submittedData.fullName}
            </li>
            <li>
              <strong>Email:</strong> {submittedData.email}
            </li>
            <li>
              <strong>Team:</strong>{" "}
              {submittedData.team.charAt(0).toUpperCase() +
                submittedData.team.slice(1)}
            </li>
            <li>
              <strong>Experience:</strong> {submittedData.experience} years
            </li>
            <li>
              <strong>Target start:</strong>{" "}
              {formatStartDate(submittedData.startDate)}
            </li>
            <li>
              <strong>Collaboration summary:</strong> {submittedData.bio ?? "—"}
            </li>
          </ul>
        </section>
      )}
      <section aria-live="polite" className={styles.historySection}>
        <div className={styles.historyHeader}>
          <h2 className={styles.historyTitle}>Recent submissions</h2>
          <button
            className={styles.historyClearButton}
            disabled={submissionHistory.length === 0}
            onClick={() => {
              setSubmissionHistory([]);

              if (typeof window !== "undefined") {
                window.localStorage.removeItem(STORAGE_KEY);
              }
            }}
            type="button"
          >
            Clear history
          </button>
        </div>

        {submissionHistory.length === 0 ? (
          <p className={styles.historyEmpty}>
            Submissions appear here once you successfully send the form.
          </p>
        ) : (
          <ol className={styles.historyList}>
            {submissionHistory.map((entry) => (
              <li className={styles.historyItem} key={entry.submittedAt}>
                <div className={styles.historyRow}>
                  <span className={styles.historyLabel}>Name</span>
                  <span>{entry.fullName}</span>
                </div>
                <div className={styles.historyRow}>
                  <span className={styles.historyLabel}>Email</span>
                  <span>{entry.email}</span>
                </div>
                <div className={styles.historyRow}>
                  <span className={styles.historyLabel}>Team</span>
                  <span>
                    {entry.team.charAt(0).toUpperCase() + entry.team.slice(1)}
                  </span>
                </div>
                <div className={styles.historyRow}>
                  <span className={styles.historyLabel}>Submitted</span>
                  <time dateTime={entry.submittedAt}>
                    {formatSubmissionTimestamp(entry.submittedAt)}
                  </time>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
      {successMessage && (
        <div className={styles.successOverlay} role="presentation">
          <div
            aria-live="assertive"
            aria-modal="true"
            className={styles.successDialog}
            role="alertdialog"
          >
            <div className={styles.successHeading}>
              <span aria-hidden="true" className={styles.successIcon}>
                ✓
              </span>
              <span>Submission received</span>
            </div>
            <p className={styles.successBody}>{successMessage}</p>
            <button
              className={styles.successClose}
              onClick={() => setSuccessMessage(null)}
              type="button"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
