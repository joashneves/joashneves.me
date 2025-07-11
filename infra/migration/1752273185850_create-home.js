exports.up = (pgm) => {
  pgm.createTable("home", {
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
    body:{
      type: 'text',
      notNull: true,
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