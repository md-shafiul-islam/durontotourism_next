import React, {useState, useEffect} from "react";
import axios from "axios";
import { GET_BACK_END_URL, REQUEST_HEADER } from "../../redux/types";
import LoaderSpiner from "../../utils/helper/loaderSpiner";


const GetVeriyPage = (params) => {
    const [status, setStatus] = useState(true);
   
    console.log("GetVeriyPage Params, ", params);
    useEffect(() => {
       setStatus(false);
    }, [params.verify]);

   
  return (
    <React.Fragment>
      <LoaderSpiner show={status}/>
    </React.Fragment>
  );
};

export async function getServerSideProps(context) {
  // let session = await getSession({ req: context.req });

  console.log("Email Varify Context, ", context.query);

  const resp = await axios.put(
    `${GET_BACK_END_URL}/verify/mail-token`,
    context.query,
    { headers: REQUEST_HEADER }
  );

  try {
    return {
      props: { verify: resp.data },
    };
  } catch (error) {
    return {
      props: { verify: { status: false } },
    };
  }
}

export default GetVeriyPage;
