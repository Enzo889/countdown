// src/theme.ts
export interface Theme {
    name: string;
    value: string;
    timelineBg: string;
    buttonBg: string;
    buttonText: string;
  }
  
  export const themes: Theme[] = [
    {
      name: 'Default',
      value: 'bg-background text-foreground',
      timelineBg: 'bg-white',
      buttonBg: 'bg-primary hover:bg-primary/90',
      buttonText: 'text-primary-foreground'
    },
    {
      name: 'Dark',
      value: 'bg-slate-950 text-slate-50',
      timelineBg: 'bg-white',
      buttonBg: 'bg-slate-700 hover:bg-slate-600',
      buttonText: 'text-slate-50'
    },
    {
      name: 'Light',
      value: 'bg-slate-50 text-slate-950',
      timelineBg: 'bg-slate-950',
      buttonBg: 'bg-slate-200 hover:bg-slate-300',
      buttonText: 'text-slate-950'
    },
    {
      name: 'Forest',
      value: 'bg-emerald-900 text-emerald-50',
      timelineBg: 'bg-white',
      buttonBg: 'bg-emerald-700 hover:bg-emerald-600',
      buttonText: 'text-emerald-50'
    },
    {
      name: 'Ocean',
      value: 'bg-blue-900 text-blue-50',
      timelineBg: 'bg-white',
      buttonBg: 'bg-blue-700 hover:bg-blue-600',
      buttonText: 'text-blue-50'
    },
    {
      name: 'Sunset',
      value: 'bg-orange-900 text-orange-50',
      timelineBg: 'bg-white',
      buttonBg: 'bg-orange-700 hover:bg-orange-600',
      buttonText: 'text-orange-50'
    }
  ];
  