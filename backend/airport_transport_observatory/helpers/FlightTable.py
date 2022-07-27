from helpers.DataReader import DataReader

class FlightTable(DataReader):

    def get_flights(self,year,tp=None):
        if tp is None:
            filtered_data = self.filterbyYear(year)
        else:
            filtered_data = self.filteredbyType(tp, year)
        filtered_data = filtered_data[['Έτος', "Πτήσεις"]]
        v1 = 0
        v2 = 0


        for index, row in filtered_data.iterrows():
            if type(row["Πτήσεις"])== str:
                continue

           # print(type(row["Πτήσεις"]))
            if (row['Έτος'] == year):
                v1 = v1 + int(row["Πτήσεις"])
            # print(v1)
            # print(row[name])
            if (row['Έτος'] == (year - 1)):
                v2 = v2 + int(row["Πτήσεις"])
        if (v2 == 0):
            results = [v1, v2, "infinity"]
        else:
            results = [v1, v2, (v1 - v2) / v2]
        return results


