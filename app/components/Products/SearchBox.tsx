import { useNavigate, useSearchParams } from "@remix-run/react";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { nursery } from "~/data/nursery";

const categories = [
  "Avenue Trees",
  "Palms",
  "Fruit Plants",
  "Flowering Plants",
  "Ornamental & Foliage",
  "Indoor Plants",
  "Creepers & Climbers",
  "Lawn & Ground Cover",
  "Bonsai & Specimen",
  "Medicinal & Herbal",
  "Bamboo & Grasses",
  "Cactus & Succulents",
];
export default function SearchBox() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const catParams = searchParams.get("cat")?.split(",").filter(Boolean) ?? [];
  const categoryKey = catParams.join(",");
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(categoryKey ? categoryKey.split(",") : []);

  useEffect(() => {
    setSelectedCategories(categoryKey ? categoryKey.split(",") : []);
  }, [categoryKey]);

  const oldQuery = searchParams.get("query") as string;
  const updateSearch = (searchValue: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("query", searchValue);
    searchParams.delete("page"); // new search → back to first page
    navigate(`/products?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const handleCategoryToggle = (label: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label];

      const searchParams = new URLSearchParams(location.search);
      searchParams.set("cat", newCategories.join(","));
      searchParams.delete("page"); // new filters → back to first page
      navigate(`/products?${searchParams.toString()}`, {
        replace: true,
      });

      return newCategories;
    });
  };

  const getDisplayText = () => {
    if (selectedCategories.length === 0) return "All";
    if (selectedCategories.length === 1) return selectedCategories[0];
    return `${selectedCategories.length} selected`;
  };

  return (
    <div className="catalogue-search">
      <div className="catalogue-search-row">
        <div className="flex items-center gap-2 w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-[30%] max-w-52">
              <Button
                variant="outline"
                className="catalogue-filter-button min-w-[60px] justify-between"
              >
                <span className="truncate">{getDisplayText()}</span>
                <ChevronDown className="h-4 w-4 ml-1 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto p-2 bg-white border-gray-200">
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div
                    key={index.toString()}
                    className="flex items-center space-x-2 p-2 hover:bg-[#eef3e9] rounded"
                  >
                    <Checkbox
                      className="border border-gray-400"
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() =>
                        handleCategoryToggle(category)
                      }
                    />
                    <label
                      htmlFor={category}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1 text-[#12382b]"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <form
            className="flex flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.target as HTMLFormElement);
              const data = Object.fromEntries(form.entries()) as {
                query: string;
              };
              updateSearch(data.query);
            }}
          >
            <Input
              type="text"
              name="query"
              placeholder={`Search ${nursery.name}`}
              defaultValue={oldQuery}
              className="catalogue-search-input rounded-none"
            />
            <Button
              className="catalogue-search-button rounded-l-none rounded-r-md px-4"
              type="submit"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
