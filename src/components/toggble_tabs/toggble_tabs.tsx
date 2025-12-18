import './toggble_tabs.scss';
import { useState } from 'react';

type Tab<T> = { text: string } & T;

type ToggleTabsProps<T> = {
  tabs: Tab<T>[];
  onChange: (tab: Tab<T>) => void;
};

export const ToggbleTabs = <T,>({ tabs, onChange }: ToggleTabsProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(() => 0);

  return (
    <div className="toggble_tabs">
      {tabs.map((tab, index) => {
        return (
          <button
            onClick={() => {
              setSelectedIndex(index);
              onChange(tab);
            }}
            key={index}
            className={index === selectedIndex ? 'chosen' : ''}
          >
            {tab.text}
          </button>
        );
      })}
    </div>
  );
};
