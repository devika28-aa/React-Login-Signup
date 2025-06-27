const InputField = ({ label, type, ...rest }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium text-gray-700">{label}</label>
      <input
        type={type}
        {...rest} // ✅ includes {...register("fieldName")}
        className="p-3 rounded-full border border-black focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default InputField;
