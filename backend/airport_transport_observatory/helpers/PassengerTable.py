import math

import numpy
import pandas as pd

from helpers.DataReader import DataReader


class PassengerTable(DataReader):

    def get_element(self, airport, year, field):
        r = self.df[(self.df["Αεροδρόμια"] == airport) & ( self.df['Έτος'] == year)]
        vl=0
        for index, row in r.iterrows():
            try:
                vl=vl+int(row[field])
            except:
                continue
        return vl
    def get_all_elements(self,year,field):
        table_name2 = "helpers/data/Αντιστοιχία Αεροδρομίων.xlsx"
        diot = DataReader(table_name2)
        r = self.df[ (self.df['Έτος'] == year)]
        r[field] = r[field].fillna(0)
        r[field] = r[field].replace(r'^\s*$', 0, regex=True)
        dr=r.groupby(["Αεροδρόμια","Έτος"])[field].sum()
        tmp=dr.to_dict()
        data={}
        for k in tmp:
            fullname = str(diot.df[diot.df["Code"] == k[0]]["Name"].values[0])
            data[fullname + " (" + k[0] + ")"]=tmp[k]
        return data


    def get_passengers(self, year, name):
        filtered_data = self.filterbyYear(year)
        filtered_data = filtered_data[['Έτος', name]]
        v1 = 0
        v2 = 0
        for index, row in filtered_data.iterrows():
            if type(row[name]) != int and type(row[name]) != float and type(row[name]) != numpy.float64:
                continue

            if (math.isnan(row[name])):
                continue
            if (row['Έτος'] == year):
                v1 = v1 + int(row[name])
            # print(v1)
            # print(row[name])
            if (row['Έτος'] == (year - 1)):
                v2 = v2 + int(row[name])
        if (v2 == 0):
            results = [v1, v2, "infinity"]
        else:
            results = [v1, v2, (v1 - v2) / v2]
        return results

    def get_passengers_by_type(self, tp, year):
        filtered_data = self.filteredbyType(tp, year)
        filtered_data = filtered_data[['Έτος', "Τύπος", 'Επιβάτες - Αφίξεις', 'Επιβάτες - Αναχωρήσεις']]
        v1 = 0
        v2 = 0
        cols = ['Επιβάτες - Αφίξεις', 'Επιβάτες - Αναχωρήσεις']
        for index, row in filtered_data.iterrows():
            t = 0
            for col in cols:
                if type(row[col]) != int and type(row[col]) != float and type(row[col]) != numpy.float64:
                    continue
                if math.isnan(row[col]):
                    continue
                if (row['Έτος'] == year):
                    v1 = v1 + int(row[col])
                if (row['Έτος'] == (year - 1)):
                    v2 = v2 + int(row[col])
        if (v2 == 0):
            results = [v1, v2, "infinity"]
        else:
            results = [v1, v2, (v1 - v2) / v2]
        return results
