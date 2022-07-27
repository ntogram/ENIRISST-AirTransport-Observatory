import json

import pandas as pd
from flask import Flask, request, jsonify

from helpers.AirportTable import AirportTable
from helpers.DataReader import DataReader
from helpers.Efficiency import Efficiency
from helpers.FlightTable import FlightTable
from helpers.ObjTable import ObjTable
from helpers.PassengerTable import PassengerTable
import timeit

app = Flask(__name__)


@app.route('/init', methods=['GET'])
def hello_world():  # put application's code here
    return jsonify({'name': 'alice',
                    'email': 'alice@outlook.com'})


@app.route('/passengers/<year>', methods=['GET'])
def getpassengers(year):
    table_name = "helpers/data/Aggregated Database.xlsx"
    dio = PassengerTable(table_name)
    y = int(year)
    data_arrivals = dio.get_passengers(y, 'Επιβάτες - Αφίξεις')
    data_departures = dio.get_passengers(y, 'Επιβάτες - Αναχωρήσεις')
    interior_data = dio.get_passengers_by_type("ΕΣΩΤΕΡΙΚΟΥ", y)
    exterior_data = dio.get_passengers_by_type("ΕΞΩΤΕΡΙΚΟΥ", y)
    total = []
    for i in range(2):
        total.append(data_arrivals[i] + data_departures[i] + interior_data[i] + exterior_data[i])
    total.append((total[0] - total[1]) / total[0])
    return jsonify({'Αφίξεις': data_arrivals, "Αναχωρήσεις": data_departures, "Εσωτερικού": interior_data,
                    "Εξωτερικού": exterior_data, "Σύνολο": total, "Έτος": y})


@app.route('/flights/<year>', methods=['GET'])
def getflights(year):
    table_name = "helpers/data/Aggregated Database.xlsx"
    dio = FlightTable(table_name)
    y = int(year)
    flights = dio.get_flights(y)
    in_flights = dio.get_flights(y, "ΕΣΩΤΕΡΙΚΟΥ")
    ex_flights = dio.get_flights(y, "ΕΞΩΤΕΡΙΚΟΥ")
    total = []
    for i in range(2):
        total.append(flights[i] + in_flights[i] + ex_flights[i])
    total.append((total[0] - total[1]) / total[0])
    return jsonify({'Πτήσεις': flights, "Εσωτερικού": in_flights,
                    "Εξωτερικού": ex_flights, "Σύνολο": total, "Έτος": y})


@app.route('/cargos/<year>', methods=['GET'])
def getcargos(year):
    table_name = "helpers/data/Aggregated Database.xlsx"
    dio = ObjTable(table_name)
    y = int(year)
    cols = ['Εμπορεύματα προέλευσης', 'Εμπορεύματα προορισμού']
    cargo_arrivals = dio.get_objs(y, 'Εμπορεύματα προέλευσης')
    cargo_departures = dio.get_objs(y, 'Εμπορεύματα προορισμού')
    interior_cargos = dio.get_objs_by_type("ΕΣΩΤΕΡΙΚΟΥ", y, cols)
    exterior_cargos = dio.get_objs_by_type("ΕΞΩΤΕΡΙΚΟΥ", y, cols)
    total = []
    for i in range(2):
        total.append(cargo_arrivals[i] + cargo_departures[i] + interior_cargos[i] + exterior_cargos[i])
    total.append((total[0] - total[1]) / total[0])
    return jsonify({'Αφίξεις': cargo_arrivals, "Αναχωρήσεις": cargo_departures, "Εσωτερικού": interior_cargos,
                    "Εξωτερικού": exterior_cargos, "Σύνολο": total, "Έτος": y})


@app.route('/post/<year>', methods=['GET'])
def getpost(year):
    table_name = "helpers/data/Aggregated Database.xlsx"
    dio = ObjTable(table_name)
    y = int(year)
    cols = ['Ταχυδρομείο προέλευσης', 'Ταχυδρομείο προορισμού']
    post_arrivals = dio.get_objs(y, 'Ταχυδρομείο προέλευσης')
    post_departures = dio.get_objs(y, 'Ταχυδρομείο προορισμού')
    interior_post = dio.get_objs_by_type("ΕΣΩΤΕΡΙΚΟΥ", y, cols)
    exterior_post = dio.get_objs_by_type("ΕΞΩΤΕΡΙΚΟΥ", y, cols)
    total = []
    for i in range(2):
        total.append(post_arrivals[i] + post_departures[i] + interior_post[i] + exterior_post[i])
    total.append((total[0] - total[1]) / total[0])
    return jsonify({'Αφίξεις': post_arrivals, "Αναχωρήσεις": post_departures, "Εσωτερικού": interior_post,
                    "Εξωτερικού": exterior_post, "Σύνολο": total, "Έτος": y})


@app.route('/cargo_post_change', methods=['GET'])
def getcargopostchange():
    table_name = "helpers/data/Aggregated Database.xlsx"
    dio = ObjTable(table_name)
    results = []
    for i in range(2011, 2021):
        cargo_arrivals = dio.get_objs(i, 'Εμπορεύματα προέλευσης')
        cargo_departures = dio.get_objs(i, 'Εμπορεύματα προορισμού')
        post_arrivals = dio.get_objs(i, 'Ταχυδρομείο προέλευσης')
        post_departures = dio.get_objs(i, 'Ταχυδρομείο προορισμού')
        r = {"Έτος 1": i,
             "Έτος 2": i - 1,
             'Εμπορεύματα προέλευσης': cargo_arrivals[2],
             'Εμπορεύματα προορισμού': cargo_departures[2],
             'Ταχυδρομείο προέλευσης': post_arrivals[2],
             'Ταχυδρομείο προορισμού': post_departures[2]
             }
        results.append(r)
    return jsonify({"ετήσιες μεταβολές": results})


def convert_pd_to_list(df):
    lst = []
    for index, row in df.iterrows():
        lst.append(row.to_dict())
    return lst


def convert_grouped_pd_to_list(df, cols):
    lst = []
    r = {}
    for index, row in df.iterrows():
        if (len(cols) == 2):
            r[cols[1]] = int(row[cols[1]])
            r[cols[0]] = row.name
        else:
            for i in range(len(cols)):
                if i == len(cols) - 1:
                    r[cols[i]] = int(row[cols[len(cols) - 1]])
                else:
                    r[cols[i]] = row.name[i]

        lst.append(r)
        r = {}

        # lst.append({cols[0]:row.name[0],cols[1]:row.name[1],cols[2]:int(row[cols[2]])})
    return lst


@app.route('/topairports', methods=['GET'])
def gettopairports():
    table_name1 = "helpers/data/Detailed Database.csv"
    dio = DataReader(table_name1, ["Αεροδρόμιο", "Επιβάτες Προέλευσης"])
    table_name2 = "helpers/data/Αντιστοιχία Αεροδρομίων.xlsx"
    diot = DataReader(table_name2)
    topairports_df = (
        dio.df.groupby(["Αεροδρόμιο"])["Επιβάτες Προέλευσης"].sum().sort_values(ascending=False).head(10)).to_frame()

    topairports_df = topairports_df.merge(diot.df, left_on='Αεροδρόμιο', right_on='Code')
    top_airports_lst = convert_pd_to_list(topairports_df)
    return jsonify({"top_airports": top_airports_lst})


@app.route('/topconnections/<int:year>', methods=['GET'])
def gettopconnections(year):
    table_name1 = "helpers/data/Detailed Database.csv"
    dio = DataReader(table_name1, ["Αεροδρόμιο", "Εσωτ/Εξωτ", "Α/Δ Προέλευσης", "Έτος"])
    interior = dio.df[(dio.df["Εσωτ/Εξωτ"] == 1) & (dio.df["Έτος"] == year)]
    interior = interior.drop(columns=["Έτος"])
    exterior = dio.df[(dio.df["Εσωτ/Εξωτ"] == 2) & (dio.df["Έτος"] == year)]
    exterior = exterior.drop(columns=["Έτος"])
    interior_connections = interior.groupby(['Αεροδρόμιο', 'Α/Δ Προέλευσης']).count()
    exterior_connections = exterior.groupby(['Αεροδρόμιο', 'Α/Δ Προέλευσης']).count()
    interior_connections.columns = interior_connections.columns.str.replace('Εσωτ/Εξωτ', 'count')
    exterior_connections.columns = exterior_connections.columns.str.replace('Εσωτ/Εξωτ', 'count')
    interior_connections = interior_connections.sort_values(by=['count'], ascending=False).head(10)
    exterior_connections = exterior_connections.sort_values(by=['count'], ascending=False).head(10)
    int_con_lst = convert_grouped_pd_to_list(interior_connections, ['Αεροδρόμιο', 'Α/Δ Προέλευσης', 'count'])
    ext_con_lst = convert_grouped_pd_to_list(exterior_connections, ['Αεροδρόμιο', 'Α/Δ Προέλευσης', 'count'])

    return jsonify({"top_connections": {
        "exterior": ext_con_lst, "interior": int_con_lst
    }
    })


@app.route('/groupby_aircraft_type/<int:year>', methods=['GET'])
def groupby_aircraft_type(year):
    table_name1 = "helpers/data/Detailed Database.csv"
    dio = DataReader(table_name1, ["Τύπος Α/φους", "Έτος"])
    data = dio.df[(dio.df["Έτος"] == year)]
    data = data.drop(columns=["Έτος"])
    aircrafttype_freq = data.groupby("Τύπος Α/φους")["Τύπος Α/φους"].count().to_frame()
    aircrafttype_freq.columns = aircrafttype_freq.columns.str.replace("Τύπος Α/φους", 'count')
    lst = convert_grouped_pd_to_list(aircrafttype_freq, ["Τύπος Α/φους", "count"])
    return jsonify({"aircraftbytype": lst
                    })


@app.route('/topeffectiveairports/<int:year>', methods=['GET'])
def gettopeffectiveairports(year):
    table_name1 = "helpers/data/Results_Efficiency.csv"
    dio = DataReader(table_name1, [])
    data1 = dio.df[(dio.df["Έτος"] == year)].sort_values(by=['Τεχνική Αποδοτικότητα'], ascending=False).head(10)
    data2 = dio.df[(dio.df["Έτος"] == (year - 1))].sort_values(by=['Τεχνική Αποδοτικότητα'], ascending=False).head(10)
    data1 = data1.drop(columns=["Έτος"])
    data2 = data2.drop(columns=["Έτος"])
    df1 = convert_pd_to_list(data1)
    df2 = convert_pd_to_list(data2)
    return jsonify({str(year): df1, str(year - 1): df2})



def getcolorcode(a):
    if (a<=1000000):
        return "#023689"
    if (a<=10000000):
        return "#75D1D8"
    if (a<=20000000):
        return "#FF9B91"
    else:
        return "#13A2DE"

def define_level(d):
    for item in d:
        d[item]={"value":d[item],"level":getcolorcode(d[item])}
    return d


@app.route('/airport_movement_by_region/<int:year>', methods=['GET'])
def getairport_movement_by_region(year):
    table_name1 = "helpers/data/Detailed Database.csv"
    dio = DataReader(table_name1, ["Εσωτ/Εξωτ", "Έτος", "NUTS 2", "Επιβάτες Προέλευσης"])
    interior = dio.df[(dio.df["Εσωτ/Εξωτ"] == 1) & (dio.df["Έτος"] == year)]
    interior = interior.drop(columns=["Έτος"])
    exterior = dio.df[(dio.df["Εσωτ/Εξωτ"] == 2) & (dio.df["Έτος"] == year)]
    exterior = exterior.drop(columns=["Έτος"])
    interior_passengers = interior.groupby(["NUTS 2"])["Επιβάτες Προέλευσης"].sum()
    exterior_passengers = exterior.groupby(["NUTS 2"])["Επιβάτες Προέλευσης"].sum()
    ip_dict=interior_passengers.to_dict()
    ip_dict=define_level(ip_dict)
    ep_dict = exterior_passengers.to_dict()
    ep_dict = define_level(ep_dict)
    return jsonify({"int":ip_dict,"ext":ep_dict})

@app.route('/cargo_post_by_region/<int:year>', methods=['GET'])
def getcargo_post_by_region(year):
    table_name1 = "helpers/data/Detailed Database.csv"
    columns=["Ταχυδρομείο Προέλευσης","Εμπορεύματα Προέλευσης","Ταχυδρομείο Προορισμού","Εμπορεύματα Προορισμού", "Έτος", "NUTS 2"]
    dio = DataReader(table_name1, columns)
    dio.df = dio.df[(dio.df["Έτος"] == year)]
    dio.df = dio.df.drop(columns=["Έτος"])
    dg=dio.df.groupby(["NUTS 2"])
    r={}
    for i in range(0,4):
        data = dg[columns[i]].sum()
        r[columns[i]]=data.to_dict()
    return jsonify({"response":r})



@app.route('/airportnames', methods=['GET'])
def getairportnames():
    table_name1 = "helpers/data/Τεχνικά Χαρακτηριστικά.xlsx"
    dio = AirportTable(table_name1)
    dio.df = dio.df[["Επίσημη Ονομασία Αεροδρομίου", "Κωδικός Aναφοράς Aεροδρομίου ΙΑΤΑ"]]
    dio.df = dio.df.dropna()
    lst = dio.get_names()[1:]
    return jsonify({"aiprort_names": lst})


@app.route('/airport_general_data/<code>', methods=['GET'])
def getgeneraldata(code):
    table_name1 = "helpers/data/Τεχνικά Χαρακτηριστικά.xlsx"
    dio = AirportTable(table_name1)
    gd = dio.get_general_attributes(code)
    gdjson = gd.to_dict('records')
    gdjson[0]["Ωράριο"] = "-"
    return jsonify({"general data": gdjson[0]})


@app.route('/airport_technical_data/<code>', methods=['GET'])
def gettechnicaldata(code):
    table_name1 = "helpers/data/Τεχνικά Χαρακτηριστικά.xlsx"
    dio = AirportTable(table_name1)
    gd = dio.get_technical_attributes(code)
    # gdjson = gd.to_dict('records')
    # gdjson[0]["Ωράριο"] = "-"
    return jsonify({"technical data": gd})


def get_indicator(a, b=False):
    if (b == True):
        if a == 0:
            return ["Επιβάτες Προέλευσης"]
        if a == 1:
            return ["Επιβάτες Προορισμού"]
        if a == 2:
            return ["Επιβάτες Προέλευσης", "Επιβάτες Προορισμού"]
        if a == 3:
            return ["Εμπορεύματα Προέλευσης", "Εμπορεύματα Προορισμού"]
        else:
            return None

    if a == 0:
        return ["Επιβάτες - Αφίξεις"]
    if a == 1:
        return ["Επιβάτες - Αναχωρήσεις"]
    if a == 2:
        return ["Επιβάτες - Αφίξεις", "Επιβάτες - Αναχωρήσεις"]
    if a == 3:
        return ["Εμπορεύματα προέλευσης", "Εμπορεύματα προορισμού"]
    else:
        return None


def get_indicator_name(a):
    if a == 0:
        return "Επιβάτες - Αφίξεις"
    if a == 1:
        return "Επιβάτες - Αναχωρήσεις"
    if a == 2:
        return "Συνολικοί Επιβάτες"
    if a == 3:
        return "Εμπορεύματα"
    else:
        return None


def convertmonth(a):
    months = ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος",
              "Σεπτέμβριος", "Οκτώβριος",
              "Νοέμβριος", "Δεκέμβριος"]
    for i in range(len(months)):
        if (a == months[i]):
            return i + 1
    return None


@app.route('/get_indicator_by_year/<code>/<int:year>/<int:ind_code>', methods=['GET'])
def get_indicator_by_year(code, year, ind_code):
    indicator = get_indicator(ind_code)
    indicator_name = get_indicator_name(ind_code)
    if (indicator is not None):
        table_name = "helpers/data/Aggregated Database.xlsx"
        table_name2 = "helpers/data/Αντιστοιχία Αεροδρομίων.xlsx"
        diot = DataReader(table_name2)
      #  print(diot.df[diot.df["Code"] == code]["Name"].values)
        fullname = str(diot.df[diot.df["Code"] == code]["Name"].values[0])
        if ind_code < 3:
            dio = PassengerTable(table_name)
        else:
            dio = ObjTable(table_name)
        ind = 0
        for i in range(len(indicator)):
            ind = ind + dio.get_element(code, year, indicator[i])
        return jsonify(
            {"indicator_name": indicator_name, "name": fullname + " (" + code + ")", "year": year, "indicator": ind})
    else:
        return jsonify({})


@app.route('/get_indicator_by_year/<int:year>/<int:ind_code>', methods=['GET'])
def get_indicator_by_year_all(year, ind_code):
    indicator = get_indicator(ind_code)
    indicator_name = get_indicator_name(ind_code)
    if (indicator is not None):
        table_name = "helpers/data/Aggregated Database.xlsx"
        if ind_code < 3:
            dio = PassengerTable(table_name)
        else:
            dio = ObjTable(table_name)

        data = []
        for i in range(len(indicator)):
            data.append(dio.get_all_elements(year, indicator[i]))
        if (len(data) == 2):
            for key in data[1]:
                if key in data[0]:
                    data[1][key] = data[1][key] + data[0][key]
                else:
                    pass
            data[0] = data[1]

        return jsonify({"indicator_name": indicator_name, "data": data[0], "Έτος": year})
    else:
        return jsonify({})


@app.route('/get_gr_indicator_by_year/<int:year>/<int:ind_code>', methods=['GET'])
def get_gr_indicator_by_year_all(year, ind_code):
    indicator = get_indicator(ind_code)
    indicator_name = get_indicator_name(ind_code)
    if (indicator is not None):
        table_name = "helpers/data/Aggregated Database.xlsx"
        if ind_code < 3:
            dio = PassengerTable(table_name)
        else:
            dio = ObjTable(table_name)

        sum = 0
        for i in range(len(indicator)):
            data = dio.get_all_elements(year, indicator[i])
            for key in data:
                sum = sum + int(data[key])
        return jsonify({"indicator": sum, "Έτος": year, "indicator_name": indicator_name})
    else:
        return jsonify({})


@app.route('/get_nut_indicator_by_year/<int:year>/<int:ind_code>', methods=['GET'])
def get_nut_indicator_by_year_all(year, ind_code):
    indicator = get_indicator(ind_code, True)
    indicator_name = get_indicator_name(ind_code)
    if (indicator is not None):
        table_name1 = "helpers/data/Detailed Database.csv"
        cols = indicator
        cols.extend(["Έτος", "NUTS 2"])
        dio = DataReader(table_name1, cols)
        indicator = get_indicator(ind_code, True)
        df = dio.df[(dio.df["Έτος"] == year)]
        df = df.drop(columns=["Έτος"])
        data = []
        for i in range(len(indicator)):
            result_frame = df.groupby(["NUTS 2"])[indicator[i]].sum()
            data.append(result_frame.to_dict())
        if (len(data) == 2):
            for key in data[1]:
                if key in data[0]:
                    data[1][key] = data[1][key] + data[0][key]
                else:
                    pass
            data[0] = data[1]

        return jsonify({"indicator_name": indicator_name, "data": data[0], "Έτος": year})
    else:
        return jsonify({})


@app.route('/get_nut_indicator_by_year/<code>/<int:year>/<int:ind_code>', methods=['GET'])
def get_nut_indicator_by_year(code, year, ind_code):
    indicator_name = get_indicator_name(ind_code)
    result = get_nut_indicator_by_year_all(year, ind_code)
    r = json.loads(result.data.decode("utf-8"))["data"][code]
    return jsonify({"NUTS2": code, "indicator": r, "year": year, "indicator_name": indicator_name})


# requests for bymonth &byday

def fix_response_keys(a, b):
    table_name2 = "helpers/data/Αντιστοιχία Αεροδρομίων.xlsx"
    diot = DataReader(table_name2)
    data = {}
    if (b == 0):
        # print(a)
        for k in a:
            period = str(k[2]) + "/" + str(k[1])
            try:
                fullname = str(diot.df[diot.df["Code"] == k[0]]["Name"].values[0]) + " (" + k[0] + ")"
            except Exception:
                fullname = "(" + k[0] + ")"
            if period not in list(data.keys()):
                data[period] = {}
            data[period][fullname] = a[k]
        return data
    if (b == 1):
        for k in a:
            period = str(k[1]) + "/" + str(k[0])
            data[period] = a[k]
        return data
    if (b == 2):
        for k in a:
            period = str(k[1]) + "/" + str(k[2])
            if period not in list(data.keys()):
                data[period] = {}
            data[period][k[0]] = a[k]
        return data
    if (b == 3):
        for k in a:
            try:
                fullname = str(diot.df[diot.df["Code"] == k[0]]["Name"].values[0])
                data[fullname + " (" + k[0] + ")"] = a[k]
            except Exception:
                data["(" + k[0] + ")"] = a[k]
    if (b == 4):
        for k in a:
            data = a[k]
        return data
    if (b == 5):
        for k in a:
            data[k[0]] = a[k]
    return data


def retrieve_airport_field(a):
    if (a == 0):
        return ["Αεροδρόμιο"]
    if (a == 1):
        return ["Α/Δ Προέλευσης"]
    if (a == 2 or a == 3):
        return ["Αεροδρόμιο", "Α/Δ Προέλευσης"]
    else:
        return None


def retrieve_day_field(a):
    if (a == 0):
        return ["Ημέρα Άφιξης"]
    if (a == 1):
        return ["Ημέρα Αναχώρησης"]
    if (a == 2 or a == 3):
        return ["Ημέρα Άφιξης", "Ημέρα Αναχώρησης"]
    else:
        return None


@app.route('/get_indicator_by_month/', defaults={'code': None}, methods=['POST'])
@app.route('/get_indicator_by_month/<code>', methods=['POST'])
def get_indicator_by_month(code):
    data = request.json
    indicator = get_indicator(data["ind"], True)
    indicator_name = get_indicator_name(data["ind"])
    airport_fields = retrieve_airport_field(data["ind"])
    if (indicator is not None):
        table_name1 = "helpers/data/Detailed Database.csv"
        cols = indicator
        cols.extend(airport_fields)
        cols.extend(["Έτος", "Μήνας"])
        dio = DataReader(table_name1, cols)
        indicator = get_indicator(data["ind"], True)
        dio.df["Μήνας"] = dio.df["Μήνας"].apply(convertmonth)
        if (data["start_year"] == data["end_year"]):
            range_condition = (((dio.df["Έτος"] == data["start_year"]) & (dio.df["Μήνας"] >= data["start_month"]) & (
                    dio.df["Μήνας"] <= data["end_month"])))
        else:
            range_condition = (((dio.df["Έτος"] == data["start_year"]) & (dio.df["Μήνας"] >= data["start_month"])) |
                               ((dio.df["Έτος"] > data["start_year"]) & (dio.df["Έτος"] < data["end_year"])) |
                               ((dio.df["Έτος"] == data["end_year"]) & (dio.df["Μήνας"] <= data["end_month"])))
        dio.df = dio.df[range_condition]

        #print(dio.df)
        data2 = []
       # print(indicator)
        init_df = dio.df
        for i in range(len(indicator)):
            if (code is not None):
                dio.df = dio.df[dio.df[airport_fields[i]] == code]
            result_frame = dio.df.groupby([airport_fields[i], "Έτος", "Μήνας"])[indicator[i]].sum()
            data2.append(result_frame.to_dict())
            dio.df = init_df

        if (len(data2) == 2):
            for key in data2[1]:
                if key in data2[0]:
                    data2[1][key] = data2[1][key] + data2[0][key]
                else:
                    pass
            for key in data2[0]:
                if (key not in data2[1]):
                    data2[1][key] = data2[0][key]
            data2[0] = data2[1]
        period = str(data["start_month"]) + "/" + str(data["start_year"]) + "-" + str(data["end_month"]) + "/" + str(
            data["end_year"])
        data2[0] = fix_response_keys(data2[0], 0)
        return jsonify({"indicator_name": indicator_name, "data": data2[0], "Περίοδος": period})
    else:
        return jsonify({})


@app.route('/get_indicator_by_month_all/', methods=['POST'])
def get_indicator_by_month_all():
    data = request.json
    indicator = get_indicator(data["ind"], True)
    indicator_name = get_indicator_name(data["ind"])
    if (indicator is not None):
        table_name1 = "helpers/data/Detailed Database.csv"
        cols = indicator
        cols.extend(["Έτος", "Μήνας"])
        dio = DataReader(table_name1, cols)
        indicator = get_indicator(data["ind"], True)
        dio.df["Μήνας"] = dio.df["Μήνας"].apply(convertmonth)
        if (data["start_year"] == data["end_year"]):
            range_condition = (((dio.df["Έτος"] == data["start_year"]) & (dio.df["Μήνας"] >= data["start_month"]) & (
                    dio.df["Μήνας"] <= data["end_month"])))
        else:
            range_condition = (((dio.df["Έτος"] == data["start_year"]) & (dio.df["Μήνας"] >= data["start_month"])) |
                               ((dio.df["Έτος"] > data["start_year"]) & (dio.df["Έτος"] < data["end_year"])) |
                               ((dio.df["Έτος"] == data["end_year"]) & (dio.df["Μήνας"] <= data["end_month"])))
        dio.df = dio.df[range_condition]
       # print(dio.df)
        data2 = []
        #print(indicator)
        for i in range(len(indicator)):
            result_frame = dio.df.groupby(["Έτος", "Μήνας"])[indicator[i]].sum()
            data2.append(result_frame.to_dict())
        if (len(data2) == 2):
            for key in data2[1]:
                if key in data2[0]:
                    data2[1][key] = data2[1][key] + data2[0][key]
                else:
                    pass
            data2[0] = data2[1]
        period = str(data["start_month"]) + "/" + str(data["start_year"]) + "-" + str(data["end_month"]) + "/" + str(
            data["end_year"])
        data2[0] = fix_response_keys(data2[0], 1)
        return jsonify({"indicator_name": indicator_name, "data": data2[0], "Περίοδος": period})
    else:
        return jsonify({})


@app.route('/get_nut_indicator_by_month/', defaults={'code': None}, methods=['POST'])
@app.route('/get_nut_indicator_by_month/<code>', methods=['POST'])
def get_nut_indicator_by_month(code):
    data = request.json
    indicator = get_indicator(data["ind"], True)
    indicator_name = get_indicator_name(data["ind"])
    if (indicator is not None):
        table_name1 = "helpers/data/Detailed Database.csv"
        cols = indicator
        cols.extend(["Έτος", "NUTS 2", "Μήνας"])
        dio = DataReader(table_name1, cols)
        indicator = get_indicator(data["ind"], True)
        dio.df["Μήνας"] = dio.df["Μήνας"].apply(convertmonth)
        if (data["start_year"] == data["end_year"]):
            range_condition = (((dio.df["Έτος"] == data["start_year"]) & (dio.df["Μήνας"] >= data["start_month"]) & (
                    dio.df["Μήνας"] <= data["end_month"])))
        else:
            range_condition = (((dio.df["Έτος"] == data["start_year"]) & (dio.df["Μήνας"] >= data["start_month"])) |
                               ((dio.df["Έτος"] > data["start_year"]) & (dio.df["Έτος"] < data["end_year"])) |
                               ((dio.df["Έτος"] == data["end_year"]) & (dio.df["Μήνας"] <= data["end_month"])))
        dio.df = dio.df[range_condition]
        if (code is not None):
            dio.df = dio.df[dio.df["NUTS 2"] == code]
        data2 = []
        for i in range(len(indicator)):
            result_frame = dio.df.groupby(["NUTS 2", "Έτος", "Μήνας"])[indicator[i]].sum()
            data2.append(result_frame.to_dict())
        if (len(data2) == 2):
            for key in data2[1]:
                if key in data2[0]:
                    data2[1][key] = data2[1][key] + data2[0][key]
                else:
                    pass
            data2[0] = data2[1]
        period = str(data["start_month"]) + "/" + str(data["start_year"]) + "-" + str(data["end_month"]) + "/" + str(
            data["end_year"])
        data2[0] = fix_response_keys(data2[0], 2)
        return jsonify({"indicator_name": indicator_name, "data": data2[0], "Περίοδος": period})
    else:
        return jsonify({})


@app.route('/get_indicator_by_day/', defaults={'code': None}, methods=['POST'])
@app.route('/get_indicator_by_day/<code>', methods=['POST'])
def get_indicator_by_day(code):
    data = request.json
    indicator = get_indicator(data["ind"], True)
    indicator_name = get_indicator_name(data["ind"])
    airport_fields = retrieve_airport_field(data["ind"])
    day_fields = retrieve_day_field(data["ind"])
    if (indicator is not None):
        table_name1 = "helpers/data/Detailed Database.csv"
        cols = indicator
        cols.extend(airport_fields)
        cols.extend(day_fields)
        cols.extend(["Έτος", "Μήνας"])
        #print(cols)
        dio = DataReader(table_name1, cols)
        indicator = get_indicator(data["ind"], True)
        dio.df["Μήνας"] = dio.df["Μήνας"].apply(convertmonth)
        data2 = []
        init_df = dio.df
        #print(indicator)
        for i in range(len(indicator)):
            range_condition = (((dio.df["Έτος"] == data["year"]) & (dio.df["Μήνας"] == data["month"]) & (
                    dio.df[day_fields[i]] == data["day"])))
            dio.df = dio.df[range_condition]
            if (code is not None):
              #  print(dio.df)
               # print(code)
                dio.df = dio.df[dio.df[airport_fields[i]] == code]
            result_frame = dio.df.groupby([airport_fields[i], "Έτος", "Μήνας", day_fields[i]])[indicator[i]].sum()
            data2.append(result_frame.to_dict())
            dio.df = init_df

        if (len(data2) == 2):
            for key in data2[1]:
                if key in data2[0]:
                    data2[1][key] = data2[1][key] + data2[0][key]
                else:
                    pass
            for key in data2[0]:
                if (key not in data2[1]):
                    data2[1][key] = data2[0][key]
            data2[0] = data2[1]
        period = str(data["day"]) + "/" + str(data["month"]) + "/" + str(data["year"])
        data2[0] = fix_response_keys(data2[0], 3)
        return jsonify({"indicator_name": indicator_name, "data": data2[0], "Περίοδος": period})
    else:
        return jsonify({})


@app.route('/get_indicator_by_day_all/', defaults={'code': None}, methods=['POST'])
def get_indicator_by_day_all(code):
    data = request.json
    indicator = get_indicator(data["ind"], True)
    indicator_name = get_indicator_name(data["ind"])
    day_fields = retrieve_day_field(data["ind"])
    if (indicator is not None):
        table_name1 = "helpers/data/Detailed Database.csv"
        cols = indicator
        cols.extend(day_fields)
        cols.extend(["Έτος", "Μήνας"])
     #   print(cols)
        dio = DataReader(table_name1, cols)
        indicator = get_indicator(data["ind"], True)
        dio.df["Μήνας"] = dio.df["Μήνας"].apply(convertmonth)
        data2 = []
        for i in range(len(indicator)):
            range_condition = (((dio.df["Έτος"] == data["year"]) & (dio.df["Μήνας"] == data["month"]) & (
                    dio.df[day_fields[i]] == data["day"])))
            dio.df = dio.df[range_condition]
            result_frame = dio.df.groupby(["Έτος", "Μήνας", day_fields[i]])[indicator[i]].sum()
            data2.append(result_frame.to_dict())

        if (len(data2) == 2):
            for key in data2[1]:
                if key in data2[0]:
                    data2[1][key] = data2[1][key] + data2[0][key]
                else:
                    pass
            for key in data2[0]:
                if (key not in data2[1]):
                    data2[1][key] = data2[0][key]

            data2[0] = data2[1]
        period = str(data["day"]) + "/" + str(data["month"]) + "/" + str(data["year"])
       # print(data2[0])
        data2[0] = fix_response_keys(data2[0], 4)
        return jsonify({"indicator_name": indicator_name, "data": data2[0], "Περίοδος": period})
    else:
        return jsonify({})


@app.route('/get_nut_indicator_by_day/', defaults={'code': None}, methods=['POST'])
@app.route('/get_nut_indicator_by_day/<code>', methods=['POST'])
def get_nut_indicator_by_day(code):
    data = request.json
    indicator = get_indicator(data["ind"], True)
    indicator_name = get_indicator_name(data["ind"])
    day_fields = retrieve_day_field(data["ind"])
    if (indicator is not None):
        table_name1 = "helpers/data/Detailed Database.csv"
        cols = indicator
        cols.extend(day_fields)
        cols.extend(["NUTS 2", "Έτος", "Μήνας"])
        #print(cols)
        dio = DataReader(table_name1, cols)
        indicator = get_indicator(data["ind"], True)
        dio.df["Μήνας"] = dio.df["Μήνας"].apply(convertmonth)
        data2 = []
        if (code is not None):
            dio.df = dio.df[dio.df["NUTS 2"] == code]
        init_df = dio.df
        #print(indicator)
        for i in range(len(indicator)):
            range_condition = (((dio.df["Έτος"] == data["year"]) & (dio.df["Μήνας"] == data["month"]) & (
                    dio.df[day_fields[i]] == data["day"])))
            dio.df = dio.df[range_condition]
            result_frame = dio.df.groupby(["NUTS 2", "Έτος", "Μήνας", day_fields[i]])[indicator[i]].sum()
            data2.append(result_frame.to_dict())
            dio.df = init_df

        if (len(data2) == 2):
            for key in data2[1]:
                if key in data2[0]:
                    data2[1][key] = data2[1][key] + data2[0][key]
                else:
                    pass
            for key in data2[0]:
                if (key not in data2[1]):
                    data2[1][key] = data2[0][key]
            data2[0] = data2[1]
        period = str(data["day"]) + "/" + str(data["month"]) + "/" + str(data["year"])

        data2[0] = fix_response_keys(data2[0], 5)
        return jsonify({"indicator_name": indicator_name, "data": data2[0], "Περίοδος": period})
    else:
        return jsonify({})


@app.route('/data_efficiency/', methods=['POST'])
def get_data_efficiency():
    data = request.json
    years=data["years"]
    airports=data["airports"]
    table_name1 = "helpers/data/Database_Efficiency.xlsx"
    input_efficiency=Efficiency(table_name1)
    #print(input_efficiency.df)
    input_efficiency.get_records_by_selected_years(years)
    input_efficiency.get_records_by_airports("Μονάδα Λήψης Απόφασης - Αεροδρόμιο",airports)
    input_efficiency_dict=input_efficiency.dict_frame();
    return jsonify({"years":years,"airports":airports,"data":input_efficiency_dict})

@app.route('/result_efficiency/', methods=['POST'])
def get_result_efficiency():
    data = request.json
    years = data["years"]
    airports = data["airports"]
    table_name1 = "helpers/data/Results_Efficiency.csv"
    output_efficiency=Efficiency(table_name1,[])
    output_efficiency.get_records_by_selected_years(years)
    output_efficiency.get_records_by_airports("Αεροδρόμιο", airports)
    output_efficiency_dict = output_efficiency.dict_frame();
    return jsonify({"years": years, "airports": airports, "data": output_efficiency_dict})
    return jsonify({})



if __name__ == '__main__':
    app.run()
