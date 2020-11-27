import React from "react";
import styled from "styled-components";
import { Card, Spinner } from "react-bootstrap";

const CardWrapper = styled(Card)`
  border-radius: 20px;
  margin: 20px 20px;
  box-shadow: 0px 5px 20px var(--box-shadow-color);
  opacity: 1;
  background: var(--white) 0% 0% no-repeat padding-box;
  width:500px;
  left: 380px;
`;

const CardComponent = ({ name, account }) => {
  if (!account)
    return <Spinner animation="border" />
  return (
    <CardWrapper className="bg-secondary">
      <Card.Body >
        <Card.Header className="bg-success rounded-pill">
          <h4>{name}</h4>
        </Card.Header>
        <div>
          <h4 className="text-primary text-center border mx-5 bg-white rounded my-2">
            {account.accountId}
          </h4>
          <h3 className="text-center text-white">Apps</h3>
          {account.apps.map((app) => (
            <div
              key={app.name}
              className="d-flex flex-column text-left bg-warning rounded m-3 p-2 mt-2"
            >
              <span>
                Name : {app.name}
              </span>
              <span >Title :
               <h5 className="border bg-info text-white rounded border-danger ml-5 p-2">
                  {app.title}
                </h5>
              </span>
            </div>
          )
          )}
        </div>

      </Card.Body>
    </CardWrapper>
  );
};

export default React.memo(CardComponent);