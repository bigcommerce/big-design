export interface ThemeOptions {
  htmlFontSize: number;
}

class Options {
  private options: ThemeOptions = {
    htmlFontSize: 16,
  };

  getOptions() {
    return { ...this.options };
  }

  setOptions(newOptions: Partial<ThemeOptions>) {
    this.options = {
      ...this.options,
      ...newOptions,
    };

    return this.getOptions();
  }
}

export const themeOptions = new Options();
