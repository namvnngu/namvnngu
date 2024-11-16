import * as v from "@valibot/valibot";

const Schema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
  theme: v.optional(v.picklist(["light", "dark"]), "dark"),
});

type Input = v.InferInput<typeof Schema>;
type Output = v.InferOutput<typeof Schema>;

const result = v.parse(Schema, {
  email: "flotes@example.com",
  password: "12345678",
});
