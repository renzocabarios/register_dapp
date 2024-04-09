"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";
import { getPda, initialize } from "@/lib/programs/register";
import { SystemProgram } from "@solana/web3.js";
import {
  UserSchema,
  userSchema,
  userSchemaDefaults,
} from "@/lib/schemas/user.schema";
import { useHomeStore } from "@/lib/zustand/home.state";

function RegisterForm() {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { createAccount, setLoading } = useHomeStore();
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: userSchemaDefaults,
  });

  function getProvider() {
    if (wallet) {
      return new AnchorProvider(connection, wallet, {});
    }
    return null;
  }

  async function onSubmit(values: UserSchema) {
    const provider = getProvider();

    if (provider && publicKey) {
      setLoading(true);
      const seeds = [Buffer.from("user"), publicKey.toBuffer()];
      const userPDA = getPda({ seeds });

      const instructions = [
        await initialize({
          provider,
          args: values,
          accounts: {
            user: userPDA[0],
            payer: publicKey,
            systemProgram: SystemProgram.programId,
          },
        }),
      ];
      createAccount({
        provider,
        payerKey: publicKey,
        instructions,
        connection,
        body: values,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-72 max-w-96  grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-1 md:col-span-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="md:col-span-2 justify-self-center">
          <Button type="submit" size={"lg"}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
