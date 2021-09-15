import { wrapper } from "../redux/nextStore";
import DtoLayout from "../components/layout/DtoLayout";

const MyApp = ({ Component, pageProps }) =>{
  return (
    <DtoLayout>
      <Component {...pageProps} />
    </DtoLayout>
  );
}


export default wrapper.withRedux(MyApp);
