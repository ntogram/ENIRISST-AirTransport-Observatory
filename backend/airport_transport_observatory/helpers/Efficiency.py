import numpy
import pandas as pd

from helpers.DataReader import DataReader


class Efficiency(DataReader):
    def __init__(self, name, cols=None):
        super().__init__(name,cols)
        self.df_init=self.df
    def get_records_by_selected_years(self,selected_years):
        self.df=self.df[self.df['Έτος'].isin(selected_years)]

    def get_records_by_airports(self,name,airports):
        self.df = self.df[self.df[name].isin(airports)]

    def dict_frame(self):
        d=[]
        for index, row in self.df.iterrows():
            d.append(row.to_dict())
        return d