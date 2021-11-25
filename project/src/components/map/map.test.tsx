import { render, screen } from '@testing-library/react';
import Map from './map';
import { makeFakeOffers } from '../../utils/mocks';

const mockOffers = [makeFakeOffers()];
const mockSelectedPoint = mockOffers[0].id;

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(
      <Map
        offers={mockOffers}
        selectedPoint={mockSelectedPoint}
      />,
    );

    expect(screen.getByText(/Leaflet/i)).toBeInTheDocument();
    expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);

    expect(screen.getByLabelText(/Zoom in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Zoom out/i)).toBeInTheDocument();
  });
});
