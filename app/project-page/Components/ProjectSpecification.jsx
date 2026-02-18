"use client";

// Import necessary components from PrimeReact
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../style.css';

export default function ProjectSpecificationTable({ specifications = [], status }) {
  // Filter specifications to separate bungalow/villa/row house from others
  const bungalowSpecs = specifications.filter((spec) =>
    ["Bunglows/Villa/Row House"].includes(spec.subType)
  );
  const otherSpecs = specifications.filter(
    (spec) => !["Bunglows/Villa/Row House"].includes(spec.subType)
  );

  // Template to format size with unit
  const sizeTemplate = (rowData) =>
    `${rowData.size || "-"} ${rowData.measurementUnit || ""}`;

  // Template to format construction area size with unit
  const constructionAreaTemplate = (rowData) =>
    `${rowData.constructionAreaSize || "-"} ${rowData.measurementUnit || ""}`;

  // Format price to Indian number system units
  const formatToIndianUnits = (num) => {
    if (num >= 1e7) {
      return `${(num / 1e7).toFixed(2)} Cr`;
    } else if (num >= 1e5) {
      return `${(num / 1e5).toFixed(2)} Lac`;
    } else {
      return num.toLocaleString('en-IN');
    }
  };

  // Template to display formatted price
  const priceTemplate = (rowData) => {
    if (!rowData.price || rowData.price <= 0) {
      return <span className="text-gray-700 italic">On Request</span>;
    }

    return (
      <span className="text-gray-700">
        ₹ {formatToIndianUnits(Number(rowData.price))}
      </span>
    );
  };

  // Template to show formatted possession date or "Ready to Move"
  const dateTemplate = (rowData) => {
    if (!rowData.possessionDate || rowData.status === "Ready to Move") {
      return <span className="text-gray-700 italic">Ready To Move</span>;
    }
    const date = new Date(rowData.possessionDate);
    return (
      <span className="text-gray-700">
        {date.toLocaleDateString('en-IN', {
          month: 'short',
          year: 'numeric'
        })}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto mt-6 space-y-10">
      <h2 className="text-xl font-bold mb-4">Price Breakup</h2>

      {/* Table for all non-bungalow specifications */}
      {otherSpecs.length > 0 && (
        <>
          <DataTable value={otherSpecs} className="text-sm" showGridlines>
            <Column field="unitType" header="Units" />
            <Column field="subType" header="Type" />
            <Column field="area" header="Area" />
            <Column header="Size" body={sizeTemplate} />
            <Column header="Possession" body={dateTemplate} />
            <Column header="Price" body={priceTemplate} />
          </DataTable>
        </>
      )}

      {/* Table specifically for bungalows, villas, row houses */}
      {bungalowSpecs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Bungalows / Villas / Row Houses</h3>
          <DataTable value={bungalowSpecs} className="text-sm" showGridlines>
            <Column field="unitType" header="Units" />
            <Column field="area" header="Area" />
            <Column header="Land Size" body={sizeTemplate} />
            <Column header="Constr. Size" body={constructionAreaTemplate} />
            <Column header="Possession" body={dateTemplate} />
            <Column header="Price" body={priceTemplate} />
          </DataTable>
        </div>
      )}
    </div>
  );
}
