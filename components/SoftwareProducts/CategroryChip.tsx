"use client";

function CategoryChip({
  name,
  selected,
}: {
  name: string;
  selected?: () => void;
}) {
  return (
    <div
      onClick={selected}
      className="flex h-fit w-fit text-sm lg:text-base cursor-pointer rounded-full border border-gray-700 px-5 py-2 text-center align-middle aria-checked:bg-green-500 aria-checked:text-white hover:border-blue-500 dark:border-gray-300 dark:hover:border-emerald-500"
    >
      {name}
    </div>
  );
}

export default CategoryChip;
