import PropTypes from "prop-types";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

RHFTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFTextField({ name, label, helperText, type }) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-3">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-textColor">
              {label}
            </label>
            <div className="relative">
              <input
                id={name}
                className="bg-gray-50 border border-gray-300 text-textColor text-sm rounded-lg pr-10 block w-full p-2.5"
                required
                {...field}
                type={type === "password" && showPassword ? "text" : type}
                placeholder={helperText}
                value={typeof field.value === "number" && field.value === 0 ? "" : field.value}
              />
              {type === "password" && (
                <div className="absolute top-2 right-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </div>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
}
