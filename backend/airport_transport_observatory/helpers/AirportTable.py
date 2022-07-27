import pandas as pd

from helpers.DataReader import DataReader


class AirportTable(DataReader):
    def __init__(self, name):
        super(AirportTable, self).__init__(name)
        self.df = pd.read_excel(self.name, header=None)
        self.df = self.df.drop([0, 1, 3])
        self.df.columns = self.df.iloc[0]
        self.df["row_id"] = list(range(0, int(self.df.count()["Κωδικός Διαδρόμου"])))

    # print(self.df)

    def get_names(self):
        lst = []
        for index, row in self.df.iterrows():
            lst.append({"name": row["Επίσημη Ονομασία Αεροδρομίου"], "code": row["Κωδικός Aναφοράς Aεροδρομίου ΙΑΤΑ"]})
        return lst

    def find_airport(self, code):
        d = self.df[self.df["Κωδικός Aναφοράς Aεροδρομίου ΙΑΤΑ"] == code]
        return d

    def get_general_attributes(self, code):
        general_attrs = ["Επίσημη Ονομασία Αεροδρομίου", "Ιστοσελίδα", "Ονομασία Περιοχής",
                         "Ονομασία Περιφερειακής Ενότητας", "Περιφέρεια", "Φορέας Διαχείρισης Αεροδρομίων",
                         "Χαρακτηρισμός Βάσει Περιοχής Εξυπηρέτησης", "Κωδικός ISO Περιοχής",
                         "Επίπεδο Συντονισμού IATA",
                         "Κωδικός Aναφοράς Aεροδρομίου ICAO", "Κωδικός Aναφοράς Aεροδρομίου ΥΠΑ",
                         "Δυνατότητα πρόσβασης με ΙΧ",
                         "Δυνατότητα πρόσβασης με ΤΑΧΙ", "Δυνατότητα πρόσβασης με λεωφορέιο",
                         "Δυνατότητα πρόσβασης ισδηροδρομικώς (ΜΕΤΡΟ, ΠΡΟΑΣΤΙΑΚΟΣ,ΤΡΑΜ)"
                         ]
       # print(len(general_attrs))
        d = self.find_airport(code)
        d = d[general_attrs]
        return d

    def get_technical_attributes(self, code):
        d = self.find_airport(code)

      #  print(d["Αριθμός Διαδρόμων"])
       # print(d["Κωδικός Διαδρόμου"])
        technincal_attrs = ["Επιφάνεια Κτιριακών Εγκαταστάσεων (τ.μ.)", "Σύστημα Check-in",
                            "Έκταση Schengen & Non – Schengen",
                            "Αριθμός Πυλών Επιβατών "]
        d2 = d[technincal_attrs]
        tcjson = d2.to_dict('records')
        other_attrs=["Έκταση Δαπέδου Στάθμευσης","Πλήθος Θέσεων Στάθμευσης Αεροσκαφών",]
        d3=d[other_attrs]
        otjson=d3.to_dict('records')
        otjson[0]["Θέσεις Στάθμευσης Αεροσκαφών"]="-"
        try:
            corno = int(d["Αριθμός Διαδρόμων"])
        except:
            corno=int(d["Αριθμός Διαδρόμων"].iloc[0])
        corlist = []
        try:
            rowid = int(d["row_id"])
        except:
            rowid = int(d["row_id"].iloc[0])
        cor_attrs = ["Κωδικός Διαδρόμου", "Μήκος Διαδρόμων (m)", "Πλάτος Διαδρόμων (m)", "Υλικό Κατασκευής Διαδρόμων",
                     "Φωτιζόμενος Διάδρομος"]

        #print(self.df)
        for i in range(rowid, (rowid + corno)):
              cur = self.df[self.df["row_id"] == i]
              cur=cur[cor_attrs]
              corlist.append(cur.to_dict('records')[0])

        #print(corlist)

        d={"Διάδρομοι":corlist,"Στοιχεία Πεδίου Ελιγμών":otjson[0],"Στοιχεία Αεροσταθμού":tcjson[0]}

        return d
