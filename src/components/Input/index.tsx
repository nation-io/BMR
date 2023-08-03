const Input = ({
  name,
  value,
  onChange,
  type = 'text',
}: {
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
}) => {
  return (
    <div>
      <label
        htmlFor='first_name'
        className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
      >
        {name}
      </label>
      <input
        className='block w-full rounded-lg border border-gray-300 bg-gray-50
                   p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
                    dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                    dark:focus:border-blue-500 dark:focus:ring-blue-500'
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
export default Input;
