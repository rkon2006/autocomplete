import React from 'react';
import { render } from '@testing-library/react';
import { HighlightedText } from './HighlightedText';

jest.mock('../api/AutocompleteApi');

describe('HighlightedText', () => {
  it('should highlight text', () => {
    const fullString = 'long test string';
    const piece = 'ong';
    const { getByText, container } = render(
      <HighlightedText fullString={fullString} piece={piece} />,
    );
    const highlightedPart = getByText(piece);

    expect(highlightedPart).toBeInTheDocument();
    expect(container.textContent).toBe(fullString);
  });
});
