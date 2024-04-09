import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { RegisterProgram } from "../target/types/register_program";
import { assert } from "chai";

describe("register_program", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  const program = anchor.workspace.RegisterProgram as Program<RegisterProgram>;
  const connection = provider.connection;

  const confirm = async (signature: string): Promise<string> => {
    const block = await connection.getLatestBlockhash();
    await connection.confirmTransaction({ signature, ...block });
    return signature;
  };

  const user = [Buffer.from("user"), provider.publicKey.toBuffer()];
  const [userKey, _bump] = anchor.web3.PublicKey.findProgramAddressSync(
    user,
    program.programId
  );

  it("Is initialized!", async () => {
    const firstName: string = "John";
    const lastName: string = "Doe";
    const email: string = "sample@mail.com";

    await program.methods
      .initialize(firstName, lastName, email)
      .accounts({
        payer: provider.publicKey,
        user: userKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()
      .then(confirm);

    const account = await program.account.user.fetch(userKey);

    assert.equal(account.firstName, firstName);
    assert.equal(account.lastName, lastName);
    assert.equal(account.email, email);
  });
});
