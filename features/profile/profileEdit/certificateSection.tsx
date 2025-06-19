import React from "react";
import { BiX } from "react-icons/bi";

export interface Certificate {
  name: string;
  url: string;
}

interface CertificateSectionProps {
  certificate: Certificate[];
  setCertificate: (updatedCertificates: Certificate[]) => void;
}

function Certificate({ certificate, setCertificate }: CertificateSectionProps) {
  const handleChange = (
    index: number,
    field: keyof Certificate,
    value: string
  ) => {
    const updated = [...certificate];
    updated[index][field] = value;
    setCertificate(updated);
  };

  const handleAddCertificate = () => {
    setCertificate([...certificate, { name: "", url: "" }]);
  };

  const handleRemoveCertificate = (index: number) => {
    const updated = certificate.filter((_, i) => i !== index);
    setCertificate(updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Certifications</h2>
      <div className="grid grid-cols-1 gap-4">
        {certificate.map((cert, index) => (
          <div key={index} className="relative border p-4 rounded-md">
            <button
              type="button"
              onClick={() => handleRemoveCertificate(index)}
              className="absolute bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
              aria-label="Delete certificate"
            >
              <BiX size={18} className="text-white" />
            </button>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="input border p-2"
                value={cert.name}
                type="text"
                onChange={(e) => handleChange(index, "name", e.target.value)}
                placeholder="Certification Name"
              />
              <input
                className="input border p-2"
                value={cert.url}
                type="url"
                onChange={(e) => handleChange(index, "url", e.target.value)}
                placeholder="Certification URL"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddCertificate}
        className="text-blue-600 mt-4"
      >
        + Add Certificate
      </button>
    </div>
  );
}

export default Certificate;
