
exports.up = (pgm) => {
  pgm.createTable("sessions",{
    id: {
      type: "uuid",
      unique: true,
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    token: {
      trype: "varchar(96)",
      unique: true,
      notNull: true,
    },
    user_id:{
      type: "uuid",
      notNull: true,
    },
    expires_at:{
      notNull: true,
      type: "timestamptz",
    },
    created_at:{
      notNull: true,
      type: "timestamptz",
      default: pgm.func("timezone('UTC', now())"),
    },
    updated_at:{
      notNull: true,
      type: "timestamptz",
      default: pgm.func("timezone('UTC', now())"),
    }
  })
};

exports.down = false;
