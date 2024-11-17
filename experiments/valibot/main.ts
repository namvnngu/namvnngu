import * as v from "@valibot/valibot";

// Source: https://blog.flotes.app/posts/bulletproof-typescript

// ----------------------------------------------------------------------------

const Schema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
  theme: v.optional(v.picklist(["light", "dark"]), "dark"),
});

v.parse(Schema, {
  email: "flotes@example.com",
  password: "12345678",
});

// ----------------------------------------------------------------------------
// # Offensive Programming (Fail Fast)

const ConfigSchema = v.strictObject({
  titleEnabled: v.optional(v.boolean(), false),
  titleRequired: v.optional(v.boolean(), false),
  titleMaxSize: v.optional(v.pipe(v.number(), v.minValue(1)), 70),
});

type ConfigInput = v.InferInput<typeof ConfigSchema>;
type ConfigOutput = v.InferOutput<typeof ConfigSchema>;

function validateConfig(input: ConfigInput): ConfigOutput {
  try {
    return v.parse(ConfigSchema, input);
  } catch (error) {
    if (error instanceof v.ValiError) {
      error.issues.forEach((issue) => console.error(issue.message));
    }
    throw error;
  }
}

validateConfig({ titleEnabled: true, titleRequired: true });

// ----------------------------------------------------------------------------
// # Defensive Programming (Fail Safe)

const PreferencesSchema = v.object({
  studyTime: v.optional(v.pipe(v.number(), v.minValue(1)), 25),
  breakTime: v.optional(v.pipe(v.number(), v.minValue(1)), 5),
  spotifyPlaylistId: v.optional(
    v.pipe(v.string(), v.length(22, "Playlist ID must be 22 characters")),
    "4PD5kOItNHxlcyigP3N58O",
  ),
});

v.safeParse(PreferencesSchema, { spotifyPlaylistId: "12" });

// ## Fallback without Issue

const SafeNumberSchema = v.pipe(
  v.union([v.string(), v.number()]),
  v.transform((value) => +value || 10),
  v.minValue(10),
  v.maxValue(20),
);

v.safeParse(SafeNumberSchema, "1");

// ----------------------------------------------------------------------------
// # Pipeline Composition

const TimeInSecondSchema = v.pipe(
  v.number(),
  v.toMinValue(0),
  v.transform(formatTime),
);

function formatTime(timeInSecond: number): string {
  return (
    Math.floor(timeInSecond / 60)
      .toString()
      .padStart(2, "0") +
    ":" +
    (timeInSecond % 60).toString().padStart(2, "0")
  );
}

v.parse(TimeInSecondSchema, 60);
