import PropTypes from "prop-types";
import { FormProvider as Form } from "react-hook-form";

RHFProvider.propTypes = {
  children: PropTypes.node,
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default function RHFProvider({ children, onSubmit, methods }) {
  return (
    <Form {...methods}>
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  );
}
