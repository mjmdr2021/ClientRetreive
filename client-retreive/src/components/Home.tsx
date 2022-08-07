import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { IClient } from "../interface/IClient";
import Card from "react-bootstrap/esm/Card";

function Home() {
  const [clientInfo, setClientInfo] = useState<IClient>();

  const refresh = () => {
    getClientInfo();
  };

  const getClientInfo = () => {
    axios
      .get("https://randomuser.me/api")
      .then((res) => {
        var result = res.data.results;
        setClientInfo({
          id: result[0].id.value,
          first: result[0].name.first,
          last: result[0].name.last,
          email: result[0].email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getClientInfo();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-6">
          <br />
          <Card className="mt-3">
            <Card.Body className="p-5">
              <p>
                <b>Name</b>: {clientInfo?.first} {clientInfo?.last}
              </p>
              <p>
                <b>Email</b>: {clientInfo?.email}
              </p>
              <Button variant="success" onClick={refresh}>
                Refresh
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
