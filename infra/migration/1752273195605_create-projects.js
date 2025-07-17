exports.up = (pgm) => {
  pgm.createTable("projects", {
    id: {
      type: "uuid",
      unique: true,
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    title: {
      type: "varchar(255)",
      unique: true,
      notNull: true,
    },
    description: {
      type: "text",
      notNull: true,
    },
    links_proj: {
      type: "text",
    },
    links_github: {
      type: "text",
    },
    links_image: {
      type: "text",
    },
    created_at: {
      notNull: true,
      type: "timestamptz",
      default: pgm.func("timezone('UTC', now())"),
    },
    updated_at: {
      notNull: true,
      type: "timestamptz",
      default: pgm.func("timezone('UTC', now())"),
    },
  });
};

exports.down = false;
