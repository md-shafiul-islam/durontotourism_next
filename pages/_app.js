import { wrapper } from "../redux/nextStore";
import { SessionProvider } from "next-auth/react";
import DtoLayout from "../components/layout/DtoLayout";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <DtoLayout>
        <Component {...pageProps} />
      </DtoLayout>
    </SessionProvider>
  );
};

export default wrapper.withRedux(MyApp);
