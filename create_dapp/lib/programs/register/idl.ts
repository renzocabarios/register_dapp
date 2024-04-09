export type RegisterProgram = {
  version: "0.1.0";
  name: "register_program";
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "firstName";
          type: "string";
        },
        {
          name: "lastName";
          type: "string";
        },
        {
          name: "email";
          type: "string";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "user";
      type: {
        kind: "struct";
        fields: [
          {
            name: "firstName";
            type: "string";
          },
          {
            name: "lastName";
            type: "string";
          },
          {
            name: "email";
            type: "string";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    }
  ];
};

export const IDL: RegisterProgram = {
  version: "0.1.0",
  name: "register_program",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "firstName",
          type: "string",
        },
        {
          name: "lastName",
          type: "string",
        },
        {
          name: "email",
          type: "string",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "user",
      type: {
        kind: "struct",
        fields: [
          {
            name: "firstName",
            type: "string",
          },
          {
            name: "lastName",
            type: "string",
          },
          {
            name: "email",
            type: "string",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
};
