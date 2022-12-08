import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetStatementsQuery } from "../gql/get/subscription/subscription.generated";
import { openLink } from "../Utils/openLink";

const ViewStatements = () => {
  const { user } = useContext(AuthContext);

  const { data, refetch } = useGetStatementsQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
  });

  useEffect(() => {
    if (data) {
      openLink(data.getStatements);
    }
  }, [data]);

  return null;
};

export default ViewStatements;
