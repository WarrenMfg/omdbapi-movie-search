import cn from 'classnames';

interface NavigationProps {
  classNames?: string;
}

const Navigation = ({ classNames }: NavigationProps) => {
  return (
    <nav className={cn('min-h-full bg-sky-900 text-cyan-100', classNames)}>
      <ul>
        <li>Menu 1</li>
        <li>Menu 2</li>
        <li>Menu 3</li>
        <li>Menu 4</li>
        <li>Menu 5</li>
        <li>Menu 6</li>
        <li>Menu 7</li>
      </ul>
    </nav>
  );
};

export default Navigation;
