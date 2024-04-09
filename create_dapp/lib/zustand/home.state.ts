import { createSelectors } from "@/lib/zustand/createSelectors";
import { AnchorProvider } from "@coral-xyz/anchor";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { create } from "zustand";
import { getPda, getUserAccount } from "../programs/register";
import { UserSchema } from "../schemas/user.schema";
import { getLatestBlockchain, legacyToV0 } from "../solana";

interface HomeStoreState {
  registered: boolean;
  loading: boolean;
}

interface IGetUserProps {
  provider: AnchorProvider;
  userPublicKey: PublicKey;
}

interface ICreateAccountProps {
  provider: AnchorProvider;
  payerKey: PublicKey;
  body: UserSchema;
  connection: Connection;
  instructions: TransactionInstruction[];
}

interface DaoStoreActions {
  setRegistered: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  getUser: ({ provider, userPublicKey }: IGetUserProps) => Promise<void>;
  createAccount: ({
    provider,
    body,
    connection,
    instructions,
    payerKey,
  }: ICreateAccountProps) => Promise<void>;
}

type HomeStore = HomeStoreState & DaoStoreActions;

const initialState: HomeStoreState = {
  registered: false,
  loading: false,
};

const useHomeStoreBase = create<HomeStore>((set) => ({
  setRegistered(value) {
    set(() => ({
      registered: value,
    }));
  },
  setLoading(value) {
    set(() => ({
      loading: value,
    }));
  },
  async createAccount({ provider, connection, instructions, payerKey }) {
    try {
      const { blockhash } = await getLatestBlockchain(connection);

      const transactionV0 = legacyToV0({
        recentBlockhash: blockhash,
        instructions,
        payerKey,
      });

      const signature = await provider.sendAndConfirm(transactionV0);
      const status = await connection.getSignatureStatus(signature);

      return set(() => ({
        loading: false,
        registered: true,
      }));
    } catch (_: any) {
      return set(() => ({
        loading: false,
        registered: false,
      }));
    }
  },
  async getUser({ provider, userPublicKey }) {
    const seeds = [Buffer.from("user"), userPublicKey.toBuffer()];
    const pda = getPda({ seeds });

    try {
      await getUserAccount({
        provider,
        address: pda[0],
      });

      return set(() => ({
        loading: false,
        registered: true,
      }));
    } catch (_: any) {
      return set(() => ({
        loading: false,
        registered: false,
      }));
    }
  },
  ...initialState,
}));

export const useHomeStore = createSelectors(useHomeStoreBase);
