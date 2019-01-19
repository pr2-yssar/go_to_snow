import pymysql 
pymysql.install_as_MySQLdb()  
from flask import Flask, render_template, redirect, jsonify, send_file
from sqlalchemy import create_engine, and_
from sqlalchemy.orm import Session
from sqlalchemy_utils import create_database, database_exists
from sqlalchemy.sql.expression import func
import scraper
from ski_resort import SkiResort, Base
from config import mysql_un, mysql_pw, mysql_uri, mysql_port
from datetime import datetime
import pandas as pd
# from pyzipcode import ZipCodeDatabase


app = Flask(__name__)

connection_string = f"mysql://{mysql_un}:{mysql_pw}@{mysql_uri}:{mysql_port}/snow_report"
if not database_exists(connection_string):
	create_database(connection_string)
engine = create_engine(connection_string)
Base.metadata.create_all(engine)
session = Session(bind=engine)

@app.route("/")
def home():
	# resorts = session.query(SkiResort)
	latest_scrape = session.query(func.max(SkiResort.scrape_timestamp))
	resort = session.query(SkiResort).order_by(
		SkiResort.inches_24_hr.desc()
		).filter(and_(SkiResort.scrape_timestamp == latest_scrape)).first()
	# Return template and data
	return render_template("index.html", resort=resort)

@app.route("/getCSV")
def getCSV():
    return send_file('static/js/Book1.csv',
                     mimetype='text/csv',
                     attachment_filename='Adjacency.csv',
                     as_attachment=True)


# @app.route('/local/<zip_code>')
# def local(zip_code):
# 	# Convert zip_code to lat and lon


# 	# Use lat and lon to filter data
# 	query=f'select * from resorts r left join ski_resort_stats s on r.resort_name = s.resort_name where lat like '{lat}%' and lon like '{lon}%''
# 	df=pd.read_sql_query(query, session.bind)
# 	df=df.fillna('null')
# 	df.astype(object).where(pd.notnull(df),None)
# 	geodata = df.to_dict('list')
# 	return jsonify(geodata)


@app.route("/about")
def about():
	return render_template("cta.html")

@app.route('/geodata')
def geodata():
	query='select * from resorts r left join ski_resort_stats s on r.resort_name = s.resort_name'
	df=pd.read_sql_query(query, session.bind)
	df=df.fillna('null')
	df.astype(object).where(pd.notnull(df),None)
	geodata = df.to_dict('list')
	return jsonify(geodata)


@app.route('/bar')
def bar():
	query='select * from resorts order by inches_24_hr desc, inches_72_hr desc limit 10'
	df=pd.read_sql_query(query, session.bind)
	bardata = df.to_dict('list')
	return jsonify(bardata)

@app.route('/scatter')
def scatter():
    query='select * from ski_resort_stats'
    df=pd.read_sql_query(query, session.bind)
    scatter_data = df.to_dict('list')
    return jsonify(scatter_data)

# @app.route('/dates/<start_date>/<end_date>')
# def dates(start_date, end_date):
# 	query=f'select soemthing from table where date > {start_date} and date < {end_date}'
# 	print(query)
# 	date = {'example':query}
# 	return jsonify(date)


@app.route("/scrape")
def scrape():
	# Resorts = Base.classes.resorts
	# conn = engine.connect()
	# conn.execute(Resorts.__table__.delete())
	# engine.execute('drop table resorts;')
	# Base.meta.drop(bind=engine, tables=[user.__table__])
	scraped_resorts = scraper.scrape_page()
	resort_objects = []
	current_timestamp = datetime.now()
	for k, v in scraped_resorts.items():
		resort_objects.append(SkiResort(
			resort_name=k,
			open_status=v['open_status'],
			inches_24_hr=v['inches_24_hr'],
			inches_72_hr=v['inches_72_hr'],
			open_lifts_pct=v['open_lifts'],
			scrape_timestamp=current_timestamp
			))
	session.add_all(resort_objects)
	session.commit()

	# print(scraped_resorts)

	return redirect("/")

if __name__ == "__main__":
	app.run(debug=True)