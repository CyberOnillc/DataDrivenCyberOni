import { Search } from "lucide-react";

function SearchBar() {
    return ( <div className="relative block">
    <form action="/search" method="GET">
      <input
        type="number"
        name='page'
        defaultValue={1}
        hidden
        className="dark:bg-[#272F43] text-white rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 xl:w-38"
      />
      <input
        type="text"
        name='q'
        placeholder="Search"
        className="dark:bg-[#272F43] text-gray-950 dark:text-white rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 xl:w-38"
      />
      <button aria-label="search button" type="submit" role="search" className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <Search />
      </button>
    </form>
  </div> );
}

export default SearchBar;