import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PredictionPage = () => {
  const { user } = useAuth();
  const [genotype, setGenotype] = useState<string>('');
  const [predictions, setPredictions] = useState<{ trait: string; prediction: number }[]>([]);
  const [error, setError] = useState<string>('');
  const predictionsRef = useRef<HTMLDivElement>(null);
  const storedUser = localStorage.getItem('user');
  
  if (!storedUser) {
    return <Navigate to="/LoginPage" />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9 ]/g, ''); // Allow only numbers & spaces
    let numbers = value.match(/10|[1-9]/g) || [];

    if (numbers.length > 24) {
      numbers = numbers.slice(0, 24);
    }

    setGenotype(numbers.join(' '));
  };

  const traitsUnits = ['(days)', '(days)', '(per spike)', '(gms)', '(Kg/ha)', '(cm)'];
  const traits = [
    'Days to Heading - ',
    'Grain Filling Duration - ',
    'Grain Number Per Spike - ',
    'Grain Weight Per Spike - ',
    'Grain Yield - ',
    'Plant Height - ',
  ];

  const submitGenotype = async () => {
    const parsedInput = genotype.match(/10|[1-9]/g);

    if (parsedInput && parsedInput.length === 24) {
      try {
        const response = await fetch('http://10.24.60.177:7860/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ip: parsedInput.map(Number) })
        });

        const data = await response.json();

        if (data.error) {
          setError(data.error);
          setPredictions([]);
        } else {
          const formattedPredictions = Object.keys(data).map((key, index) => ({
            trait: key.replace('_Pooled', ''),
            prediction: data[key]
          }));

          setPredictions(formattedPredictions);
          setError('');

          // Scroll to predictions
          setTimeout(() => {
            predictionsRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } catch (err) {
        setError('Failed to fetch predictions');
        setPredictions([]);
      }
    } else {
      setError('Please enter exactly 24 values (1-10).');
      setPredictions([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="input-section mb-6">
        <label htmlFor="genotypeInput" className="block text-lg font-medium">
          Enter DNA Sequence (24 values between 1-10, space-separated)
        </label>

        <p>
          Refer{' '}
          <Link 
            to="/SNPInfo" 
            className="text-green-600 hover:text-green-800 px-3 py-2 text-sm font-medium"
          >
            SNPInfo
          </Link>
        </p>

        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
          <p>AA - 1</p>
          <p>AT - 2</p>
          <p>AG - 3</p>
          <p>AC - 4</p>
          <p>TT - 5</p>
          <p>TG - 6</p>
          <p>TC - 7</p>
          <p>GG - 8</p>
          <p>GC - 9</p>
          <p>CC - 10</p>
        </div>

        <input
          type="text"
          id="genotypeInput"
          value={genotype}
          onChange={handleInputChange}
          maxLength={100}
          className="w-full border border-gray-300 rounded-md p-2 mt-2"
        />

        <button
          id="submitBtn"
          onClick={submitGenotype}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md mt-4"
        >
          Submit
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {predictions.length > 0 && (
        <div ref={predictionsRef} className="mt-8">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Trait</th>
                <th className="border px-4 py-2">Prediction</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="border px-4 py-2">{traits[index]}{item.trait}</td>
                  <td className="border px-4 py-2">{item.prediction} {traitsUnits[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">Trait Descriptions</h3>
            <div className="mt-4 space-y-4">
              <p><strong>Days to Heading (DH):</strong> The number of days from planting to the emergence of the wheat head (spike) from the stem. It indicates the growth rate and adaptation to environmental conditions.</p>
              <p><strong>Grain Filling Duration (GFD):</strong> The number of days between heading and physiological maturity, representing the period when grains develop and accumulate biomass. A longer duration often improves grain weight and yield.</p>
              <p><strong>Grain Number Per Spike (GNPS):</strong> The total number of grains produced on a single spike (head) of wheat. It is a key yield component influenced by genetics and environmental conditions.</p>
              <p><strong>Grain Weight Per Spike (GWPS):</strong> The total weight of all grains in a single spike, indicating grain productivity per spike. It depends on grain size and number. It is measured in gms (Ex. 2.1 gms).</p>
              <p><strong>Plant Height (PH):</strong> The height of the wheat plant from the base to the top of the spike. It affects lodging resistance (plant falling over), water use efficiency, and overall crop performance.</p>
              <p><strong>Grain Yield (GY):</strong> The total weight of grains harvested per unit area (e.g., kg/ha). It is the primary trait for assessing wheat productivity and is influenced by other traits like GNPS, GWPS, and GFD.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionPage;
