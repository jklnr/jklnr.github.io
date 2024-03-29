import "./App.css";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  const [helloMessageResponse, setHelloMessageResponse] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "jklnr-api-73ea6b412c87.herokuapp.com";

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/`,
            scope: "read:current_user",
          },
        });

        const helloMessageUrl = `https://${domain}/api/v1/hello`;

        const helloMessageResponse = await fetch(helloMessageUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const helloMessageResponse_ = await helloMessageResponse.json();

        setHelloMessageResponse(helloMessageResponse_);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="App">
      {helloMessageResponse ? (
        <>
          {JSON.stringify(helloMessageResponse, null, 2)}
          <LogoutButton></LogoutButton>
        </>
      ) : (
        <LoginButton></LoginButton>
      )}
    </div>
  );
}

export default App;
