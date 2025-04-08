import React from "react";

const snpData = [
  { id: "AX-94462858", position: "553,146,272", description: "A genetic marker associated with wheat yield traits." },
  { id: "AX-95071247", position: "143,438,568", description: "Linked to grain weight and drought resistance." },
  { id: "AX-94646188", position: "78,343,644", description: "Influences plant height and biomass." },
  { id: "AX-94776946", position: "647,927,975", description: "Related to grain filling duration and quality." },
  { id: "AX-94702181", position: "105,412,667", description: "Marker for disease resistance." },
  { id: "AX-94477591", position: "635,264,767", description: "Associated with grain yield potential." },
  { id: "AX-94710748", position: "326,464,823", description: "Impacts spike size and grain number." },
  { id: "AX-94440104", position: "59,213,510", description: "Linked to flowering time." },
  { id: "AX-94480569", position: "478,555,437", description: "Influences kernel weight and size." },
  { id: "AX-94524677", position: "514,593,813", description: "Marker for water-use efficiency." },
  { id: "AX-94547219", position: "513,572,057", description: "Associated with stress tolerance." },
  { id: "AX-94670667", position: "479,876,161", description: "Influences nutrient efficiency." },
  { id: "AX-94572618", position: "591,524,581", description: "Related to biomass accumulation." },
  { id: "AX-94663690", position: "45,354,900", description: "Linked to flowering duration." },
  { id: "AX-94998259", position: "555,325,353", description: "Influences grain quality." },
  { id: "AX-94475556", position: "586,102,229", description: "Marker for spike density." },
  { id: "AX-94534637", position: "517,524,441", description: "Associated with root length and water uptake." },
  { id: "AX-94823460", position: "86,398,896", description: "Impacts grain protein content." },
  { id: "AX-94978875", position: "25,633,098", description: "Linked to drought resilience." },
  { id: "AX-95224988", position: "547,810,743", description: "Related to disease resistance." },
  { id: "AX-94944591", position: "157,862,189", description: "Influences grain shape." },
  { id: "AX-94541833", position: "3,740,808", description: "Associated with early flowering." },
  { id: "AX-94628115", position: "462,228,297", description: "Affects plant height and yield." },
  { id: "AX-94981573", position: "116,377,176", description: "Influences kernel density." }
];

const SNPInfo: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Introductory Section */}
      <div className="bg-blue-50 shadow-md rounded-lg p-6 mb-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">🌾 Wheat SNP Information</h1>
        
        <h2 className="text-2xl font-semibold mb-2">🧬 What are SNPs?</h2>
        <p className="text-gray-700 mb-4">
          <strong>Single Nucleotide Polymorphisms (SNPs)</strong> are small genetic variations that occur at a single position in the DNA sequence. 
          In wheat, SNPs play a vital role in identifying genetic markers linked to important traits such as:
        </p>
        
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li><strong>🌿 Growth & Development:</strong> Plant height, heading time, and grain filling duration.</li>
          <li><strong>🌾 Yield Traits:</strong> Grain number per spike, grain weight, and overall yield.</li>
          <li><strong>🌡️ Stress Resistance:</strong> Drought, heat, and disease tolerance.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">🌿 Why Are SNPs Important in Wheat Breeding?</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>✅ Precision Breeding:</strong> Helps identify desirable traits for selecting high-yielding and stress-tolerant wheat varieties.</li>
          <li><strong>🔍 Phenotypic Prediction:</strong> SNP markers are used in <strong>AgroPred</strong> to predict traits like grain yield, plant height, and spike characteristics based on DNA sequences.</li>
          <li><strong>🌾 Improved Farming Decisions:</strong> Provides insights into wheat performance, aiding farmers in selecting better-performing varieties.</li>
        </ul>
      </div>

      {/* SNP Table Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border px-4 py-3 text-left">SNP ID</th>
              <th className="border px-4 py-3 text-left">Genomic Position 📍</th>
              <th className="border px-4 py-3 text-left">Description 📝</th>
            </tr>
          </thead>
          <tbody>
            {snpData.map((snp, index) => (
              <tr
                key={index}
                className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="border px-4 py-3">{snp.id}</td>
                <td className="border px-4 py-3">{snp.position}</td>
                <td className="border px-4 py-3">{snp.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SNPInfo;
