import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({ formData }) => (
  <Wrapper>
    <Card>
      <Name>Thanks for ordering, {formData.givenName}!</Name>
      <Order>
        Your order of <Span>{formData.order}</Span> will be sent to your home in{" "}
        <Span>{formData.province}</Span>, Canada.
      </Order>
      <Thank>Thank you for participating!</Thank>
    </Card>
  </Wrapper>
);

const Span = styled.span`
  color: #373352;
  font-weight: bold;
`;

const Thank = styled.p`
  padding: 20px 10px;
  font-weight: bold;
  color: #373352;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 340px;
  height: auto;
`;

const Card = styled.div``;

const Order = styled.p`
  padding: 20px 10px;
  font-size: 18px;
`;

const Name = styled.p`
  padding-top: 20px;
  font-size: 24px;
  font-weight: bold;
`;

export default ConfirmationMsg;
