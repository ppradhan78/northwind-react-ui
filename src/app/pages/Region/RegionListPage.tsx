import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { regionApi } from "../../api/regionApi";
import type { Region } from "../../models/Region";
import RegionTable from "../../components/Region/RegionTable";
import Pagination from "../../shared/components/Pagination";
import SearchBox from "../../shared/components/SearchBox";

export default function RegionListPage() {
  const navigate = useNavigate();
  const [regions, setRegions] = useState<Region[]>([]);
  const [search, setSearch] = useState("");

  // Sorting
  const [sortField, setSortField] = useState<keyof Region>("regionDescription");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // Paging
  const [page, setPage] = useState(1);
  const pageSize = 2;

  useEffect(() => {
    loadRegions();
  }, []);

  const loadRegions = async () => {
    try {
      const res = await regionApi.getAll();
      setRegions(
        res.map((r: any) => ({
          regionId: r.regionId,
          regionDescription: r.regionDescription,
        }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      // always executed
    }
  };

  // Filter
  const filteredRegions = useMemo(() => {
    return regions.filter((r) =>
      r.regionDescription.toLowerCase().includes(search.toLowerCase())
    );
  }, [regions, search]);

  // Sort
  const sortedRegions = useMemo(() => {
    return [...filteredRegions].sort((a, b) => {
      const aVal = a[sortField] ?? "";
      const bVal = b[sortField] ?? "";
      const result =
        typeof aVal === "string"
          ? aVal.localeCompare(bVal as string)
          : (aVal as number) - (bVal as number);
      return sortDir === "asc" ? result : -result;
    });
  }, [filteredRegions, sortField, sortDir]);

  // Page
  const pagedRegions = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedRegions.slice(start, start + pageSize);
  }, [sortedRegions, page]);

  const totalPages = Math.ceil(sortedRegions.length / pageSize);

  const handleDelete = async (id: number) => {
    await regionApi.delete(id);
    setRegions((prev) => prev.filter((r) => r.regionId !== id));
  };

  const handleSort = (field: keyof Region) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  return (
    <>
      <h2>Regions</h2>

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => navigate("/regions/new")}>New Region</button>
      </div>

      <SearchBox
        value={search}
        onChange={setSearch}
        placeholder="Search Region Description..."
      />

      <RegionTable
        data={pagedRegions}
        sortField={sortField}
        sortDir={sortDir}
        onSort={handleSort}
        onView={(id) => navigate(`/regions/${id}`)}
        onEdit={(id) => navigate(`/regions/edit/${id}`)}
        onDelete={handleDelete}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
