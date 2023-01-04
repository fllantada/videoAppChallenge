FROM mongo:latest
COPY setup.sh .
RUN mkdir -p /data
RUN chown -R mongodb:mongodb /data
VOLUME /data
CMD ["bash", "setup.sh"]
