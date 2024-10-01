const WhiteButton = ({
  onClick,
  disabled,
  name,
}: {
  onClick?: () => void;
  disabled?: boolean;
  name: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        disabled
          ? 'cursor-not-allowed  hover:text-gray-400 bg-gray-100 hover:bg-gray-200'
          : 'cursor-pointer border-gray-600 hover:shadow-xl text-black transition-transform duration-100 transform hover:translate-y-[-4px] focus:translate-y-0'
      }
      text-sm md:text-lg border  px-6 md:px-12 py-3 rounded-md  `}
    >
      {name}
    </button>
  );
};

export default WhiteButton;
