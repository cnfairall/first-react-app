import React from 'react';
import FactCard from '@/components/Card';
import PropTypes from 'prop-types';
import { readFacts } from '@/api/facts';

export default async function ResponsePage({ params, searchParams }) {
  const response = await readFacts(params.userId, searchParams.value);

  return (
    <div>
      {Object.values(response).map((fact) => (
        <FactCard key={fact.firebaseKey} fact={fact} />
      ))}
    </div>
  );
}

ResponsePage.propTypes = {
  params: PropTypes.string.isRequired,
  searchParams: PropTypes.string.isRequired,
};
