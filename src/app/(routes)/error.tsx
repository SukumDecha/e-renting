"use client";

import { Alert, Button } from "antd";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Alert
      message="Something went wrong!"
      showIcon
      description={error.message}
      type="error"
      action={
        <Button size="small" danger onClick={reset}>
          Try again
        </Button>
      }
    />
  );
};

export default Error;
