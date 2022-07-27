import pandas as pd


class DataReader:
    def __init__(self, name,cols=None):
        self.name = name
        if (cols is None):
            self.df = pd.read_excel(name)
        else:
            if(len(cols)==0):
                self.df = pd.read_csv(name, sep=",")
            else:
                self.df = pd.read_csv(name,sep=";",encoding= 'ISO-8859-7',usecols=cols)







    def filterbyYear(self, year):
        filtered_df = self.df[(self.df["Έτος"] == year) | (self.df["Έτος"] == (year - 1))]
        return filtered_df

    def filteredbyType(self, tp, year=-1):
        if year == -1:
            filtered_df = self.df[(self.df["Τύπος"] == tp)]
        else:
            filtered_df = self.df[
                ((self.df["Έτος"] == year) | (self.df["Έτος"] == (year - 1))) & (self.df["Τύπος"] == tp)]
        return filtered_df
