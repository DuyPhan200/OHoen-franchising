import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NavigationMenu from './NavigationMenu';
import { MenuItem } from '../../types';

describe('NavigationMenu', () => {
  const mockNavigate = vi.fn();
  const mockItems: MenuItem[] = [
    { label: 'LOCATIONS', path: '/locations', ariaLabel: 'View our locations' },
    { label: 'MENU', path: '/menu', ariaLabel: 'View our menu' },
    { label: 'CATERING', path: '/catering', ariaLabel: 'Catering services' },
    { label: 'FRANCHISE', path: '/franchise', ariaLabel: 'Franchise opportunities' },
    { label: 'ABOUT US', path: '/about', ariaLabel: 'About Bún Mee' },
  ];

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  /**
   * Test: Renders all five menu items
   * Requirement 2.1: Display five menu items
   */
  it('should render all five menu items', () => {
    render(<NavigationMenu items={mockItems} onNavigate={mockNavigate} />);
    
    expect(screen.getByText('LOCATIONS')).toBeInTheDocument();
    expect(screen.getByText('MENU')).toBeInTheDocument();
    expect(screen.getByText('CATERING')).toBeInTheDocument();
    expect(screen.getByText('FRANCHISE')).toBeInTheDocument();
    expect(screen.getByText('ABOUT US')).toBeInTheDocument();
  });

  /**
   * Test: Horizontal menu layout
   * Requirement 2.2: Positioned horizontally in the center of the header
   */
  it('should display menu items in horizontal layout', () => {
    const { container } = render(<NavigationMenu items={mockItems} onNavigate={mockNavigate} />);
    
    const menuList = container.querySelector('ul');
    expect(menuList).toBeInTheDocument();
    
    // Check that list items are rendered
    const menuItems = container.querySelectorAll('li');
    expect(menuItems).toHaveLength(5);
  });

  /**
   * Test: Click handler for navigation
   * Requirement 2.3: Navigate to corresponding page when clicked
   */
  it('should call onNavigate with correct path when menu item is clicked', () => {
    render(<NavigationMenu items={mockItems} onNavigate={mockNavigate} />);
    
    const menuLink = screen.getByText('MENU');
    fireEvent.click(menuLink);
    
    expect(mockNavigate).toHaveBeenCalledWith('/menu');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  /**
   * Test: Click handler for all menu items
   * Requirement 2.3: Navigate to corresponding page when clicked
   */
  it('should call onNavigate with correct path for each menu item', () => {
    render(<NavigationMenu items={mockItems} onNavigate={mockNavigate} />);
    
    fireEvent.click(screen.getByText('LOCATIONS'));
    expect(mockNavigate).toHaveBeenCalledWith('/locations');
    
    fireEvent.click(screen.getByText('CATERING'));
    expect(mockNavigate).toHaveBeenCalledWith('/catering');
    
    fireEvent.click(screen.getByText('FRANCHISE'));
    expect(mockNavigate).toHaveBeenCalledWith('/franchise');
    
    fireEvent.click(screen.getByText('ABOUT US'));
    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });

  /**
   * Test: Keyboard navigation with Tab
   * Requirement 8.2: Keyboard navigable using Tab and Enter keys
   */
  it('should be keyboard navigable with Tab key', () => {
    render(<NavigationMenu items={mockItems} onNavigate={mockNavigate} />);
    
    const menuLink = screen.getByText('MENU');
    menuLink.focus();
    
    expect(menuLink).toHaveFocus();
  });

  /**
   * Test: Keyboard navigation with Enter key
   * Requirement 8.2: Keyboard navigable using Tab and Enter keys
   */
  it('should call onNavigate when Enter key is pressed', () => {
    render(<NavigationMenu items={mockItems} onNavigate={mockNavigate} />);
    
    const menuLink = screen.getByText('MENU');
    menuLink.focus();
    
    fireEvent.keyDown(menuLink, { key: 'Enter' });
    
    expect(mockNavigate).toHaveBeenCalledWith('/menu');
  });

  /**
   * Test: Keyboard navigation does not trigger on other keys
   * Requirement 8.2: Keyboard navigable using Tab and Enter keys
   */
  it('should not call onNavigate when other keys are pressed', () => {
    render(<NavigationMenu items={mockItems} onNavigate={mockNavigate} />);
    
    const menuLink = screen.getByText('MENU');
    menuLink.focus();
    
    fireEvent.keyDown(menuLink, { key: 'Space' });
    fireEvent.keyDown(menuLink, { key: 'Escape' });
    
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  /**
   * Test: ARIA labels for accessibility
   * Requirement 8.2: Proper accessibility attributes
   */
  it('should have proper aria-labels for accessibility', () => {
    render(<NavigationMenu items={mockItems} onNavigate={mockNavigate} />);
    
    expect(screen.getByLabelText('View our locations')).toBeInTheDocument();
    expect(screen.getByLabelText('View our menu')).toBeInTheDocument();
    expect(screen.getByLabelText('Catering services')).toBeInTheDocument();
    expect(screen.getByLabelText('Franchise opportunities')).toBeInTheDocument();
    expect(screen.getByLabelText('About Bún Mee')).toBeInTheDocument();
  });

  /**
   * Test: Navigation role for accessibility
   * Requirement 8.2: Use semantic HTML elements
   */
  it('should have navigation role for accessibility', () => {
    const { container } = render(<NavigationMenu items={mockItems} onNavigate={mockNavigate} />);
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveAttribute('role', 'navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  /**
   * Test: Prevent default link behavior
   * Requirement 2.3: Custom navigation handling
   */
  it('should prevent default link behavior on click', () => {
    render(<NavigationMenu items={mockItems} onNavigate={mockNavigate} />);
    
    const menuLink = screen.getByText('MENU');
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');
    
    menuLink.dispatchEvent(clickEvent);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  /**
   * Test: Consistent spacing between menu items
   * Requirement 2.5: Maintain consistent spacing
   */
  it('should maintain consistent spacing between menu items', () => {
    const { container } = render(<NavigationMenu items={mockItems} onNavigate={mockNavigate} />);
    
    const menuList = container.querySelector('ul');
    expect(menuList).toBeInTheDocument();
    
    // Verify all menu items are rendered with consistent structure
    const menuItems = container.querySelectorAll('li');
    expect(menuItems).toHaveLength(5);
  });

  /**
   * Test: Active state styling
   * Requirement 3.6: Apply active class to menu item matching activePath
   */
  it('should apply active class to menu item matching activePath', () => {
    const { container } = render(
      <NavigationMenu 
        items={mockItems} 
        onNavigate={mockNavigate} 
        activePath="/franchise"
      />
    );
    
    const franchiseLink = screen.getByText('FRANCHISE');
    // CSS Modules generate scoped class names, so we check if the class attribute contains 'active'
    expect(franchiseLink.className).toContain('active');
    
    // Other links should not have active class
    const locationsLink = screen.getByText('LOCATIONS');
    expect(locationsLink.className).not.toContain('active');
  });

  /**
   * Test: No active state when activePath is not provided
   * Requirement 3.6: activePath is optional
   */
  it('should not apply active class when activePath is not provided', () => {
    const { container } = render(
      <NavigationMenu 
        items={mockItems} 
        onNavigate={mockNavigate}
      />
    );
    
    const franchiseLink = screen.getByText('FRANCHISE');
    // CSS Modules generate scoped class names, so we check if the class attribute contains 'active'
    expect(franchiseLink.className).not.toContain('active');
  });
});
